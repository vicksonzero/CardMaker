module.exports = (function () {

	function Storage() {
		this.haveLocalStorage = storageTest();

	}

	var p = Storage.prototype;

	p.write = function write(key, val) {
		// nothing
		return this;
	};

	p.read = function read(key) {
		return "";
	};

	p.remove = function remove(key) {
		// nothing
		return this;
	};


	p.storageTest = storageTest;
	function storageTest(){
		return true;
	}

	return Storage;
})();
