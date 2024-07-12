import { writable } from "svelte/store";

export const counter = writable(0, (set, update) => {

    set(10);

    update(prevCount => prevCount * 2);

    return () => console.log("gone now");
});

counter.subscribe(count => console.log(count));