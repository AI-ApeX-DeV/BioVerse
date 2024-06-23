// SPDX-License-Identifier: MIT
pragma solidity 0.8.18;

contract PolyFund{
    mapping(address=>uint) public contributors;
    address public manager;
    uint public minContribution;
    uint256 public deadline;
    uint256 public target;
    uint256 public raisedAmount;
    uint256 public noOfContributors;

    modifier onlyManager(){
        require(msg.sender==manager,"Only manager can call this function.");
        _;
    }

    constructor(uint256 _target,uint256 _deadline){
        target=_target;
        deadline=block.timestamp+_deadline;
        minContribution=100 wei;
        manager=msg.sender;
    }

    
    function updateDeadline(uint256 newTime) onlyManager public {
        deadline = block.timestamp + newTime;
    }

    function sendEth() public payable {
        require(block.timestamp<deadline,"Deadline has passed.");
        require(msg.value>=minContribution,"Amount should be gte 100 wei.");
        if (contributors[msg.sender]==0 ) {
            noOfContributors++;
        }
        contributors[msg.sender]+=msg.value;
        raisedAmount+=msg.value;
    }

    function getContractBalance() public view returns(uint){
        return address(this).balance;
    }
    function currentTime() public view returns(uint256){
        return block.timestamp;
    }

    function refund() public payable  {
        require(contributors[msg.sender]!=0,"You have not contributed in the contract.");
        require(deadline<=block.timestamp,"Contract's deadline has not passed.");
        require(target>raisedAmount,"Amount has reached the target amt");
        address payable user = payable(msg.sender);
        user.transfer(contributors[msg.sender]);
        noOfContributors--;
        raisedAmount-=contributors[msg.sender];
        contributors[msg.sender]=0;
    }

   struct Request{
        string description;
        address payable recipient;
        string recipientName;
        uint value;
        bool completed;
        uint noOfVoters;
        mapping(address=>bool)  voters;
        string cause;
        string imgURL;
    }
    mapping (uint=>Request) public requests;
    uint public numRequests;
    
    function createRequests(string memory _cause,string memory _recipientName,string memory _description,address payable _recipient,uint256 _value,string memory _imgURL) public onlyManager{
        Request storage newRequest = requests[numRequests++]; //here newRequest is a pointer because of storage keyword, and it is pointing to request object at some index
        //any changes to newRequest will get affect at request with index numRequest
        newRequest.description=_description;
        newRequest.recipient=_recipient;
        newRequest.value=_value;
        newRequest.completed=false;
        newRequest.noOfVoters=0;
        newRequest.recipientName=_recipientName;
        newRequest.cause =_cause;
        newRequest.imgURL=_imgURL;
       
    }

    function voteRequest(uint256 _reqNum) public {
        require(contributors[msg.sender]>0,"You are not a contributer.");
        Request storage Req = requests[_reqNum];
        require(Req.voters[msg.sender]==false,"You have already voted. ");
        Req.voters[msg.sender]=true;
        Req.noOfVoters++;
    }

    function readVoters(uint256 _index,address _a) public view  returns(bool) {
        Request storage Req = requests[_index];
        return Req.voters[_a];
    }

    function makePayment(uint _reqNum) public onlyManager{
        require(target<=raisedAmount,"Raised amount did not reached target.");
        Request storage Req = requests[_reqNum];
        require(Req.completed==false,"The request already been completed.");
        require(Req.noOfVoters>noOfContributors/2,"Majority does not support.");
        Req.recipient.transfer(Req.value);
        Req.completed =true;
    }

}