const List = function(data) {
    this.mainFriendsList = data;
};

List.prototype = {
    setCustomList: function() {
        this.customFriendsList = localStorage.customFriendsList ? JSON.parse(localStorage.customFriendsList) : [];

        if (this.customFriendsList.length) {
            this._updateMainFriendsList();
        }

        return this.customFriendsList;
    },

    setMainFriendsList: function(list) {
        this.mainFriendsList = list;
    },

    getCustomFriendsList: function() {
        return this.customFriendsList;
    },

    getMainFriendsList: function () {
        return this.mainFriendsList;
    },

    moveFromMainToCustom: function (item) {
        this._changeList(this.mainFriendsList, this.customFriendsList, item);
    },

    moveFromCustomToMain: function(item) {
        this._changeList(this.customFriendsList, this.mainFriendsList, item);
    },

    _updateMainFriendsList: function() {
        this.mainFriendsList = this.mainFriendsList.filter((item) => {
            return !this.customFriendsList.some((friend) => friend.photo_100 === item.photo_100);
        });

        return this.mainFriendsList;
    },

    _changeList: function(from, to, item) {
        const index = from.findIndex((friend) => {
            return friend.photo_100 === item.photo_100;
        });

        to.push(item);
        from.splice(index, 1);
    }
};

export default List;
