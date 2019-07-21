class Topic {
    constructor(name, votes) {
        this.name = name;
        this.votes = votes;
    }

    upVote() {
        this.votes++;
    }

    downVote() {
        this.votes--;
    }

}

module.exports = Topic;