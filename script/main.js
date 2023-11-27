const days = 24;

const calendarClassName = "calendar";

const headerClassName = "header";

const headerTextContent = "✨ Advent Calendar ✨";

const doorClassName = "door";

const clickedClassName = "clicked";

class Calendar {
    static #counter = 0;
    #id
    #nodeToAppendTo
    #listOfContent
    #enforceOrder
    #openPrevious
    #calendarElement
    #headerElement
    #listOfDoors
    constructor(nodeToAppendTo, listOfContent, enforceOrder = false, openPrevious = false) {
        this.id = Calendar.#nextId();
        console.log(this.id);
        this.nodeToAppendTo = nodeToAppendTo;
        this.listOfContent = listOfContent;
        this.enforceOrder = enforceOrder;
        this.openPrevious = openPrevious;
        this.calendarElement = null;
        this.headerElement = null;
        this.listOfDoors = null;
    }

    get id() {
        return this.#id;
    }

    set id(id) {
        this.#id = id;
    }

    get nodeToAppendTo() {
        return this.#nodeToAppendTo;
    }

    set nodeToAppendTo(nodeToAppendTo) {
        this.#nodeToAppendTo = nodeToAppendTo;
    }

    get listOfContent() {
        return this.#listOfContent;
    }

    set listOfContent(listOfContent) {
        this.#listOfContent = listOfContent;
    }

    get enforceOrder() {
        return this.#enforceOrder;
    }

    set enforceOrder(enforceOrder) {
        this.#enforceOrder = enforceOrder;
    }

    get openPrevious() {
        return this.#openPrevious;
    }

    set openPrevious(openPrevious) {
        this.#openPrevious = openPrevious;
    }

    get calendarElement() {
        return this.#calendarElement;
    }

    set calendarElement(calendarElement) {
        this.#calendarElement = calendarElement;
    }

    get headerElement() {
        return this.#headerElement;
    }

    set headerElement(headerElement) {
        this.#headerElement = headerElement;
    }

    get listOfDoors() {
        return this.#listOfDoors;
    }

    set listOfDoors(listOfDoors) {
        this.#listOfDoors = listOfDoors;
    }

    createCalendarElement() {
        if (this.calendarElement === null) {
            const calendarElement = document.createElement("section");
            calendarElement.classList.add(calendarClassName);
            calendarElement.id = Calendar.createCalendarIdString(this.id);
            this.calendarElement = calendarElement;
        }
    }

    appendCalendarElement() {
        if (this.calendarElement !== null) {
            this.nodeToAppendTo.appendChild(this.calendarElement);
        }
    }

    createHeaderElement() {
        if (this.headerElement === null) {
            const headerElement = document.createElement("section");
            headerElement.classList.add(headerClassName);
            headerElement.id = Calendar.createHeaderIdString(this.id);
            const paragraphElement = document.createElement("p");
            paragraphElement.textContent = headerTextContent;
            headerElement.appendChild(paragraphElement);
            this.headerElement = headerElement;
        }
    }

    appendHeaderElement() {
        if (this.headerElement !== null) {
            this.calendarElement.appendChild(this.headerElement);
        }
    }

    createDoors() {
        if (this.#listOfDoors === null) {
            this.#listOfDoors = [];
            for (let i = 0; i < days; i++) {
                const door = Door.initiateNewDoor(i + 1, this.id, this.calendarElement, this.listOfContent[i], this.enforceOrder);
                this.listOfDoors.push(door);
            }
        }
    }

    openPreviousDoors() {
        for (let door of this.listOfDoors) {
            Door.showHiddenContent(this.id, door.doorId, door.doorElement, door.content, this.enforceOrder, this.openPrevious);
        }
    }

    static #nextId() {
        return ++Calendar.#counter;
    }

    static createCalendarIdString(id) {
        return calendarClassName + "-" + id;
    }

    static createHeaderIdString(id) {
        return Calendar.createCalendarIdString(id) + "-" + "header";
    }

    static initiateNewCalendar(nodeToAppendTo, listOfContent, enforceOrder = false, openPrevious = false) {
        let calendar = null;
        if (listOfContent.length === days) {
            calendar = new Calendar(nodeToAppendTo, listOfContent, enforceOrder, openPrevious);
            calendar.createCalendarElement();
            calendar.appendCalendarElement();
            calendar.createHeaderElement();
            calendar.appendHeaderElement();
            calendar.createDoors();
            if (calendar.openPrevious) {
                calendar.openPreviousDoors();
            }
        }
        return calendar;
    }

}


class Door {
    #doorId
    #calendarId
    #nodeToAppendTo
    #content
    #enforceOrder
    #doorElement
    constructor(doorId, calendarId, nodeToAppendTo, content, enforceOrder = false) {
        this.doorId = doorId;
        this.calendarId = calendarId;
        this.nodeToAppendTo = nodeToAppendTo;
        this.content = content;
        this.enforceOrder = enforceOrder;
        this.doorElement = null;
    }

    get doorId() {
        return this.#doorId;
    }

    set doorId(doorId) {
        this.#doorId = doorId;
    }

    get calendarId() {
        return this.#calendarId;
    }

    set calendarId(calendarId) {
        this.#calendarId = calendarId;
    }


    get nodeToAppendTo() {
        return this.#nodeToAppendTo;
    }

    set nodeToAppendTo(nodeToAppendTo) {
        this.#nodeToAppendTo = nodeToAppendTo;
    }

    get content() {
        return this.#content;
    }

    set content(content) {
        this.#content = content;
    }

    get enforceOrder() {
        return this.#enforceOrder;
    }

    set enforceOrder(enforceOrder) {
        this.#enforceOrder = enforceOrder;
    }

    get doorElement() {
        return this.#doorElement;
    }

    set doorElement(doorElement) {
        this.#doorElement = doorElement;
    }

    createDoorElement() {
        if (this.doorElement === null) {
            const doorElement = document.createElement("section");
            doorElement.classList.add(doorClassName);
            doorElement.id = Door.createDoorIdString(this.calendarId, this.doorId);
            const paragraphElement = document.createElement("p");
            paragraphElement.textContent = this.doorId;
            doorElement.appendChild(paragraphElement);
            this.doorElement = doorElement;
        }
    }

    addDoorEventListener() {
        if (this.doorElement !== null) {
            const calendarId = this.calendarId;
            const doorId = this.doorId;
            const doorElement = this.doorElement;
            const content = this.content;
            const enforceOrder = this.enforceOrder;
            this
                .doorElement
                .addEventListener("click", () => Door.showHiddenContent(calendarId, doorId, doorElement, content, enforceOrder));
        }
    }

    appendDoorElement() {
        if (this.doorElement !== null) {
            this.nodeToAppendTo.appendChild(this.doorElement);
        }
    }

    static createDoorIdString(calendarId, doorId) {
        return Calendar.createCalendarIdString(calendarId) + "-" + doorClassName + doorId;
    }

    static showHiddenContent(calendarId, doorId, doorElement, content, enforceOrder = false, openPrevious = false) {
        let orderIsSatisfied = true;
        if (enforceOrder) {
            for (let i = 1; i < doorId; i++) {
                const currentDoorId = Door.createDoorIdString(calendarId, i);
                const currentDoorElement = document.getElementById(currentDoorId);
                if (!currentDoorElement.classList.contains(clickedClassName)) {
                    orderIsSatisfied = false;
                    break;
                }
            }
        }
        if (orderIsSatisfied) {

            let now = new Date;
            let minDay = new Date();

            //TODO: REMOVE!

            // Test
            now.setMonth(11);
            now.setDate(25);

            if (openPrevious) {
                now.setDate(now.getDate() - 1);
            }

            minDay.setMonth(11);
            minDay.setDate(doorId);
            if (now >= minDay) {
                doorElement.textContent = content;
                doorElement.style.justifyContent = "center";
                doorElement.style.alignContent = "center";
                doorElement.classList.add(clickedClassName);
            }
        }
    }

    static initiateNewDoor(doorId, calendarId, nodeToAppendTo, content, enforceOrder = false) {
        const door = new Door(doorId, calendarId, nodeToAppendTo, content, enforceOrder);
        door.createDoorElement();
        door.addDoorEventListener();
        door.appendDoorElement();
        return door;
    }

}

const content = [
    "🌨️", "❄️", "🧣", "🏂", "🧦", "🎿", "🍊", "🥌", "🧤", "🧥", "⛷️", "🌰",
    "🕯️", "📖", "🍫", "☃️", "🌟", "🔔", "🎄", "🍪", "🥛", "🛷", "🦌", "🎅"
]

const body = document.querySelector("body");

Calendar.initiateNewCalendar(body, content, false, false);

