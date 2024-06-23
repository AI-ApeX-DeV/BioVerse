#![no_std]

extern crate alloc;
use alloc::string::String;
use soroban_sdk::{contractimpl, symbol, Env, Symbol, Address, contract, BigInt, Map, Vec};

#[contract]
pub struct PolyFund;

impl PolyFund {
    pub fn initialize(env: Env, manager: Address, target: BigInt, deadline: u64) {
        let min_contribution = BigInt::from(100);
        let current_time = env.block().timestamp();

        env.storage().set(&symbol!("manager"), &manager);
        env.storage().set(&symbol!("target"), &target);
        env.storage().set(&symbol!("deadline"), &(current_time + deadline));
        env.storage().set(&symbol!("min_contribution"), &min_contribution);
        env.storage().set(&symbol!("raised_amount"), &BigInt::from(0));
        env.storage().set(&symbol!("no_of_contributors"), &0_u64);
    }

    pub fn update_deadline(env: Env, new_time: u64) {
        let manager: Address = env.storage().get(&symbol!("manager")).unwrap();
        env.require_auth(&manager);

        let current_time = env.block().timestamp();
        env.storage().set(&symbol!("deadline"), &(current_time + new_time));
    }

    pub fn send_funds(env: Env, contributor: Address, value: BigInt) {
        let deadline: u64 = env.storage().get(&symbol!("deadline")).unwrap();
        let min_contribution: BigInt = env.storage().get(&symbol!("min_contribution")).unwrap();

        let current_time = env.block().timestamp();
        if current_time >= deadline {
            panic!("Deadline has passed.");
        }

        if value < min_contribution {
            panic!("Amount should be greater than or equal to 100.");
        }

        let mut raised_amount: BigInt = env.storage().get(&symbol!("raised_amount")).unwrap();
        let mut no_of_contributors: u64 = env.storage().get(&symbol!("no_of_contributors")).unwrap();
        
        let contributor_balance: BigInt = env.storage().get(&(symbol!("contributors"), &contributor)).unwrap_or(BigInt::from(0));

        if contributor_balance == BigInt::from(0) {
            no_of_contributors += 1;
            env.storage().set(&symbol!("no_of_contributors"), &no_of_contributors);
        }

        let new_balance = contributor_balance + value;
        env.storage().set(&(symbol!("contributors"), &contributor), &new_balance);

        raised_amount += value;
        env.storage().set(&symbol!("raised_amount"), &raised_amount);
    }

    pub fn get_contract_balance(env: Env) -> BigInt {
        env.ledger().balance()
    }

    pub fn current_time(env: Env) -> u64 {
        env.block().timestamp()
    }

    pub fn refund(env: Env, contributor: Address) {
        let deadline: u64 = env.storage().get(&symbol!("deadline")).unwrap();
        let target: BigInt = env.storage().get(&symbol!("target")).unwrap();
        let mut raised_amount: BigInt = env.storage().get(&symbol!("raised_amount")).unwrap();
        let mut no_of_contributors: u64 = env.storage().get(&symbol!("no_of_contributors")).unwrap();

        let current_time = env.block().timestamp();
        let contributor_balance: BigInt = env.storage().get(&(symbol!("contributors"), &contributor)).unwrap();

        if contributor_balance == BigInt::from(0) {
            panic!("You have not contributed to the contract.");
        }

        if current_time <= deadline {
            panic!("Contract's deadline has not passed.");
        }

        if raised_amount >= target {
            panic!("Target amount has been reached.");
        }

        env.ledger().transfer(contributor.clone(), &contributor_balance);

        no_of_contributors -= 1;
        raised_amount -= contributor_balance;
        env.storage().set(&symbol!("no_of_contributors"), &no_of_contributors);
        env.storage().set(&symbol!("raised_amount"), &raised_amount);
        env.storage().set(&(symbol!("contributors"), &contributor), &BigInt::from(0));
    }

    pub fn create_request(env: Env, manager: Address, description: String, recipient: Address, recipient_name: String, value: BigInt, cause: String, img_url: String) {
        env.require_auth(&manager);

        let mut num_requests: u64 = env.storage().get(&symbol!("num_requests")).unwrap_or(0_u64);
        let request_key = (symbol!("requests"), num_requests);

        let request = Request {
            description,
            recipient,
            recipient_name,
            value,
            completed: false,
            no_of_voters: 0,
            cause,
            img_url,
            voters: Map::new(&env),
        };

        env.storage().set(&request_key, &request);
        num_requests += 1;
        env.storage().set(&symbol!("num_requests"), &num_requests);
    }

    pub fn vote_request(env: Env, contributor: Address, req_num: u64) {
        let contributor_balance: BigInt = env.storage().get(&(symbol!("contributors"), &contributor)).unwrap();

        if contributor_balance == BigInt::from(0) {
            panic!("You are not a contributor.");
        }

        let num_requests: u64 = env.storage().get(&symbol!("num_requests")).unwrap_or(0_u64);
        if req_num >= num_requests {
            panic!("Request number is invalid.");
        }

        let request_key = (symbol!("requests"), req_num);
        let mut request: Request = env.storage().get(&request_key).unwrap();

        if request.voters.get(&contributor).unwrap_or(false) {
            panic!("You have already voted.");
        }

        request.voters.set(&contributor, &true);
        request.no_of_voters += 1;
        env.storage().set(&request_key, &request);
    }

    pub fn read_voters(env: Env, req_num: u64, voter: Address) -> bool {
        let request_key = (symbol!("requests"), req_num);
        let request: Request = env.storage().get(&request_key).unwrap();

        *request.voters.get(&voter).unwrap_or(&false)
    }

    pub fn make_payment(env: Env, manager: Address, req_num: u64) {
        env.require_auth(&manager);

        let target: BigInt = env.storage().get(&symbol!("target")).unwrap();
        let raised_amount: BigInt = env.storage().get(&symbol!("raised_amount")).unwrap();

        if raised_amount < target {
            panic!("Raised amount did not reach the target.");
        }

        let request_key = (symbol!("requests"), req_num);
        let mut request: Request = env.storage().get(&request_key).unwrap();

        if request.completed {
            panic!("The request has already been completed.");
        }

        let no_of_contributors: u64 = env.storage().get(&symbol!("no_of_contributors")).unwrap();

        if request.no_of_voters <= no_of_contributors / 2 {
            panic!("Majority does not support the payment.");
        }

        env.ledger().transfer(request.recipient.clone(), &request.value);
        request.completed = true;
        env.storage().set(&request_key, &request);
    }
}

#[derive(Clone)]
pub struct Request {
    description: String,
    recipient: Address,
    recipient_name: String,
    value: BigInt,
    completed: bool,
    no_of_voters: u64,
    cause: String,
    img_url: String,
    voters: Map<Address, bool>,
}
