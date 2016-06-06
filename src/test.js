function somethingAsynchronous () {
    return new Promise(function (resolve) {
        setTimeout(resolve, 1000);
    });
}

class SomethingOrOther {
    async somethingAsync (foobar) {
        await somethingAsynchronous();
        return "Hello, " + foobar;
    }
}

const myThing = new SomethingOrOther();


myThing.somethingAsync("Matt").then(console.log.bind(console));