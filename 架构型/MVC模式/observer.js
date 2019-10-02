// 观察者模式
const observer = (function() {
    const events = {};
    
    return {
        subscribe(eventName, callback) {
            if( !events.hasOwnProperty(eventName) ) events[eventName] = [];
            events[eventName].push(callback);
        },
        unsubscribe(eventName, callback) {
            let index = 0, length = 0;

            if( events.hasOwnProperty(eventName) ) {
                length = events[eventName].length;
                for(; index<length; index++) {
                    if(events[eventName][index] === callback) {
                        events[eventName].splice(index, 1);
                        break;
                    }
                }
            }
        },
        public(eventName, ...data) {
            if(events.hasOwnProperty(eventName)) {
                events[eventName].map(event => event.apply(this, data));
            }
        }
    };
})();

window.observer = observer;
