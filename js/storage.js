module.exports = (function () {

	function Storage() {
		this.haveLocalStorage = localStorageTest();

	}

	var p = Storage.prototype;

	p.write = function write(key, val) {
		// body...
	};


	function localStorageTest(){
		var test = 'test';
		try {
			localStorage.setItem(test, test);
			localStorage.removeItem(test);
			return true;
		} catch(e) {
			return false;
		}
	}

	return Storage;
})();
