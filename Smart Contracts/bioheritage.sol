// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;
contract deso{
   
   

    // unique code = hashtag
   struct Post{
    uint user_id;
    string post_content;
    string unique_code;
    uint likes;
    address owner;
    string img;
   }

   struct privatePost{
    uint user_id;
    string post_content;
    string hash;
    uint likes;
    address owner;
    uint price;
    string img;
    
    
   }

   

    struct User{
        string name;
        string username;
        string profile;
    uint user_id;
    uint token;
    string interest;
    uint256[] array;
    uint256[] publicPosts; // Array to store indexes of public posts
    uint256[] privatePosts;
    uint tip;
    }

    struct Comment{
        string name;
        string profile;
        string comment;
        uint256 time;
       
    }

    // event NewPostCreated(address, uint256, string, string);
    // event TipSent(address indexed from, address indexed to, uint amount);
    // event userDataEvent(string username,
    // uint user_id,
    // uint token,
    // uint[] array,
    // uint tip);

   mapping(uint256=>Post) public post;
   mapping(address=>uint256[]) public userPost;
   mapping(address=>User) public user_data;
   mapping(uint256=>privatePost) public private_post;
   mapping(uint256=>Comment[]) public comments;
   mapping(uint256=>Comment[]) public private_comments;
   mapping(uint256=>address[]) public access; //for determining which address have access to private posts
   mapping(string => bool) usedUsernames;

   


   uint public  solTokenPool = 50000000;
   uint private numPost=0;
   uint private numPrivatePost=0;
   string[] public usernames;



//    modifier onlyManager(){
//         require(msg.sender==manager,"Only manager can call this function.");
//         _;
//     }

   

    //  function isUsernameUnique(string memory _username) public view returns (bool) {
    //     return !usedUsernames[_username];
    // }

    
    function createUser(string memory _name,string memory _username,string memory _interest,uint _user_id,string memory _profile ) public {
        require(!usedUsernames[_username], "Username already taken");
        usedUsernames[_username] = true;
    

          user_data[msg.sender] = User({
            name:_name,
            username:_username,
            profile:_profile,
            user_id: _user_id,
            token: 50,
            interest:_interest,
            array: new uint[](0),
            publicPosts: new uint[](0),
            privatePosts: new uint[](0),
            tip:0
        });
        solTokenPool -=50;

    }

    // function login(address _walletAddress) public view returns(uint){
    //     return user_data[_walletAddress].user_id | 0;
    // }

    function like(uint256 _postId) public   {
        require(user_data[msg.sender].token >=2);
        // require(post[_postId].user_id > 0, "Post does not exist");
        user_data[msg.sender].token -=2;
        

        user_data[post[_postId].owner].token += 2;
        post[_postId].likes += 1;
       if (user_data[msg.sender].array.length == 0) {
        user_data[msg.sender].array.push(1);
    } else {
        user_data[msg.sender].array[0]++;
    }
        rewardUser(address(msg.sender));
    }

    function rewardUser(address _user) public {
       

        if(user_data[address(_user)].array.length ==2 && user_data[_user].array[1]>=10&&user_data[_user].array[0]>=1){

        user_data[_user].token +=50;
        solTokenPool-=50;
        user_data[_user].array[0]-=1;
        user_data[_user].array[1]-=10;}

    }

    function getRewardSuccess(address _user) public view returns(uint256 ){
        uint numb =0;
        if(user_data[address(_user)].array.length ==2 ){
                numb=user_data[_user].array[0]*1000+user_data[_user].array[1];
        }
        else if (user_data[address(_user)].array.length ==1 ) {
            numb = user_data[_user].array[0]*1000;
        }
        return numb;
    }

function addComment(uint256 _postIndex, string memory _comment) public {
        // require(post[_postIndex].user_id > 0, "Post does not exist");
        if(post[_postIndex].user_id > 0){

             Comment memory data = Comment({
       
        name: user_data[msg.sender].name,
        profile:user_data[msg.sender].profile,
        comment:_comment,
        time: block.timestamp
    
    });
        comments[_postIndex].push(data);
         if (user_data[msg.sender].array.length <=1) {
        user_data[msg.sender].array.push(1);
    } else {
        user_data[msg.sender].array[1]++;
    }
        // user_data[msg.sender].array[1] +=1;
        rewardUser(msg.sender);
}

    }

    

    function addPrivateComment(uint256 _postIndex, string memory _comment) public {
        require(private_post[_postIndex].user_id > 0, "Post does not exist");

          Comment memory data = Comment({
        
        name: user_data[msg.sender].name,
        profile:user_data[msg.sender].profile,
        comment:_comment,
        time: block.timestamp
    });
        private_comments[_postIndex].push(data);
         if (user_data[msg.sender].array.length <=1) {
        user_data[msg.sender].array.push(1);
    } else {
        user_data[msg.sender].array[1]++;
    }
        rewardUser(msg.sender);


    }

    function createPost(string memory _img,uint256 _postId,string memory _description,string memory _hashtag) public{
        require(user_data[msg.sender].token>=15);
        user_data[msg.sender].token -=15;
        solTokenPool+=15;
    //      post[_postId].user_id =1;
    // post[_postId].post_content = _description;
    // post[_postId].unique_code= _hashtag;
    // post[_postId].comment = [];
    // post[_postId].likes=0;
    // post[_postId].owner = msg.sender;

 

    Post memory newPost = Post({
        user_id: 1,
        post_content: _description,
        unique_code: _hashtag,
        likes: 0,
        owner: msg.sender,
        img:_img
    });

uint256[] memory newArray = new uint256[](userPost[msg.sender].length + 1);

  for (uint i = 0; i < userPost[msg.sender].length; i++) {
    newArray[i] = userPost[msg.sender][i];
  }

  newArray[newArray.length - 1] = numPost;
   user_data[msg.sender].publicPosts.push(numPost);

  userPost[msg.sender]= newArray;

    post[numPost++] = newPost;
    

    // emit NewPostCreated(msg.sender, _postId, _description, _hashtag);
    }

    function createPrivatePost(string memory _img,string memory _description,uint _price,string memory _hash) public {
    require(user_data[msg.sender].token>=50);
    user_data[msg.sender].token -=50;
    solTokenPool+=50;
    privatePost memory newPost = privatePost({
        user_id: 1,
        post_content: _description,
        hash:_hash,
        likes: 0,
        owner: msg.sender,
        price: _price,
        img:_img
    });
user_data[msg.sender].privatePosts.push(numPrivatePost);

    private_post[numPrivatePost++] = newPost;

    uint256[] memory newArray = new uint256[](userPost[msg.sender].length + 1);

  for (uint i = 0; i < userPost[msg.sender].length; i++) {
    newArray[i] = userPost[msg.sender][i];
  }

  newArray[newArray.length - 1] = numPrivatePost-1;

  userPost[msg.sender]= newArray;
    


    }

    

    function tip(address _to , uint _amount) public {
        require(user_data[msg.sender].token>=_amount,"Not enough amount");
        user_data[msg.sender].token-=_amount;
        user_data[_to].token+=_amount;
        user_data[_to].tip += _amount;

        
    }

    function buyCoin(uint coin) public payable {
        require(msg.value>=0.01 ether,"Amount should be gte 0.01 eth.");
        user_data[msg.sender].token+=coin;
        solTokenPool-=coin;
        }
    
    function withdrawCoin(uint _coin) public payable {
        require(_coin >= 10, "You can only withdraw 10 or more coins");
        address payable user = payable(msg.sender);
        uint total = _coin * 1e16; // Multiplying by 0.01 (wei conversion)

        user.transfer(total);
        user_data[msg.sender].token -= _coin;
        solTokenPool += _coin;
    }

    ///getter function

function getPost(uint256 key) public view returns (Post memory) {
  return (post[key]);
}

//not working
// function getUserPost(address userAddress) public  view returns (uint256[] memory) {
//     return userPost[userAddress];
// }

// function getUserData(address userAddress) public  view returns (User memory) {
// //    emit userDataEvent(user_data[userAddress].username,user_data[userAddress].user_id,user_data[userAddress].token,user_data[userAddress].array,user_data[userAddress].tip);
//     return user_data[userAddress];
// }

function getPrivatePost(uint256 key) public  view returns ( privatePost memory) {
    return private_post[key];
}

function getComments(uint256 key) public view returns (Comment[] memory) {
    return comments[key];
}



function getPrivateComments(uint256 key) public view returns (Comment[] memory) {
    return private_comments[key];
}

// Accessing publicPosts of a user
function getPublicPosts(address userAddress) public view returns (uint256[] memory) {
    return user_data[userAddress].publicPosts;
}

// Accessing privatePosts of a user
function getPrivatePosts(address userAddress) public view returns (uint256[] memory) {
    return user_data[userAddress].privatePosts;
}
   
function buyPrivatePost(uint256 _postId) public {
    if(private_post[_postId].user_id >0 && user_data[msg.sender].token>=private_post[_postId].price){
        user_data[msg.sender].token -=private_post[_postId].price;
        user_data[private_post[_postId].owner].token +=private_post[_postId].price;
        access[_postId].push(msg.sender);
    }
}

function getAllPost() public view returns(Post[] memory){
    Post[] memory allPost = new Post[](numPost);
    for (uint i =0; i<numPost; i++) 
    {
        Post storage item=post[i];
        allPost[i]=item;
    }
    return allPost;
}

function getAllPrivatePost() public view returns(privatePost[] memory){
    privatePost[] memory allPost = new privatePost[](numPrivatePost);
    for (uint i =0; i<numPrivatePost; i++) 
    {
        privatePost storage item=private_post[i];
        allPost[i]=item;
    }
    return allPost;
}


}
