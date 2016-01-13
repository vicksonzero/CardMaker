var Storage = require('./Storage');

module.exports = (function () {

	function StorageLocalStorage() {
		this.haveLocalStorage = storageTest();

	}

	StorageLocalStorage.prototype = new Storage();
	var p = StorageLocalStorage.prototype;

	p.write = function write(key, val) {
		localStorage.setItem(key, val);
		return this;
	};

	p.read = function read(key) {
		if(! this.haveLocalStorage) return null;
		if(! localStorage.hasOwnProperty(key)) return null;
		return localStorage.getItem(key);
	};

	p.remove = function remove(key) {
		localStorage.removeItem(key);
		return this;
	};


	p.storageTest = storageTest;
	function storageTest(){
		var test = 'test';
		try {
			localStorage.setItem(test, test);
			localStorage.removeItem(test);
			return true;
		} catch(e) {
			return false;
		}
	}

	return StorageLocalStorage;
})();
