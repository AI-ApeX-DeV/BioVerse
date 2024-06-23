// SPDX-License-Identifier: MIT

pragma solidity ^0.8.18;


contract AiPlatform {
 address public owner;
    uint256 public entryFee = 0.001 ether;
    uint256 public totalEntries;
    uint256 public winnerReward = 0.002 ether;
    uint256 public contractBalance;
    string  public  word;

    struct Player {
        address playerAddress;
        string imageUrl;
        bool hasVoted;
        uint256 votesReceived;
    }
     struct LeaderboardEntry {
        address walletAddress;
        uint256 wins;
    }

    Player[3] public players;
    bool public gameStarted;
    mapping(address => bool) public joinedMembers;
    mapping(address => bool) public voted;
    mapping(address => uint256) public playerVotes;
     LeaderboardEntry[] public leaderboard;

    event GameStarted();
    event GameEnded(address winner, uint256 reward);
    event PlayerJoined(address player);
    event PlayerVoted(address player);
    event RoomDismissed();

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier roomNotStarted() {
        require(!gameStarted, "Game has already started");
        _;
    }

    modifier roomStarted() {
        require(gameStarted, "Game has not started yet");
        _;
    }

    modifier playerNotJoined() {
        require(!joinedMembers[msg.sender], "Player has already joined");
        _;
    }

    modifier playerJoined() {
        require(joinedMembers[msg.sender], "Player has not joined");
        _;
    }

    modifier playerNotVoted() {
        require(!voted[msg.sender], "Player has already voted");
        _;
    }

    function joinRoom(string memory _word) external payable roomNotStarted playerNotJoined {
        require(msg.value == entryFee, "Incorrect entry fee");
        require(totalEntries < 3, "Room is full");
        word = _word;
        players[totalEntries] = Player(msg.sender, '0', false,0);
        totalEntries++;
        joinedMembers[msg.sender] = true;

        emit PlayerJoined(msg.sender);

        if (totalEntries == 3) {
            gameStarted = true;
            emit GameStarted();
        }
    }

     function uploadPicUrl(string memory _imageUrl) external  playerJoined {
        for (uint256 i = 0; i < 3; i++) {
            if (players[i].playerAddress == msg.sender) {
                players[i].imageUrl = _imageUrl;
                break;
            }
        }
    }

     function vote(uint256 _imageIndex) external roomStarted playerJoined {
    require(_imageIndex < 3, "Invalid image index");
    // require(!players[_imageIndex].hasVoted, "Player has already voted");

    // Ensure that the player has joined the game and hasn't already voted.
    for (uint256 i = 0; i < 3; i++) {
        if (players[i].playerAddress == msg.sender) {
            players[i].hasVoted = true;
            break;
        }
    }

    // Update the votes count for the chosen image.
    players[_imageIndex].votesReceived++;
    playerVotes[msg.sender] = _imageIndex;

    emit PlayerVoted(msg.sender);

    if (isAllVoted()) {
        selectWinner();
    }
}

    function isAllVoted() internal view returns (bool) {
        for (uint256 i = 0; i < 3; i++) {
            if (!players[i].hasVoted) {
                return false;
            }
        }
        return true;
    }

     function selectWinner() public   payable  {
        uint256 maxVotesIndex;
        uint256 maxVotes = 0;

        for (uint256 i = 0; i < 3; i++) {
            if (players[i].votesReceived > maxVotes) {
                maxVotes = players[i].votesReceived;
                maxVotesIndex = i;
            }
        }

        address winner = players[maxVotesIndex].playerAddress;

        // players[findPlayerIndex(winner)].wins++;
        updateLeaderboard(findPlayerIndex(winner));
        payable(winner).transfer(winnerReward);
        // contractBalance -= winnerReward;

        emit GameEnded(winner, winnerReward);

        eraseRoom();
    }

 function findPlayerIndex(address _player) internal view returns (uint256) {
        for (uint256 i = 0; i < 3; i++) {
            if (players[i].playerAddress == _player) {
                return i;
            }
        }
        revert("Player not found");
    }

    function eraseRoom() internal {
        for (uint256 i = 0; i < 3; i++) {
            delete joinedMembers[players[i].playerAddress];
            delete voted[players[i].playerAddress];
        }
        delete players;
        gameStarted = false;
        totalEntries = 0;

        emit RoomDismissed();
    }

    function updateLeaderboard(uint256 _winnerIndex) internal {
        bool found = false;
        for (uint256 i = 0; i < leaderboard.length; i++) {
            if (leaderboard[i].walletAddress == players[_winnerIndex].playerAddress) {
                leaderboard[i].wins++;
                found = true;
                break;
            }
        }
        if (!found) {
            leaderboard.push(LeaderboardEntry(players[_winnerIndex].playerAddress, 1));
        }
    }

    function getLeaderboardData() external view returns (address[] memory, uint256[] memory) {
        address[] memory addresses = new address[](leaderboard.length);
        uint256[] memory wins = new uint256[](leaderboard.length);

        for (uint256 i = 0; i < leaderboard.length; i++) {
            addresses[i] = leaderboard[i].walletAddress;
            wins[i] = leaderboard[i].wins;
        }

        return (addresses, wins);
    }

    function withdraw() external payable  onlyOwner {
        payable(owner).transfer(address(this).balance);
    }

    // Fallback function to receive ether
    // receive() external payable {}
}