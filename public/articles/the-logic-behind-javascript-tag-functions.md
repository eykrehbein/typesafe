If you know React's [styled-components](https://styled-components.com), you probably also know tag functions. If you are not aware of it, don't worry, you do not even see that they are functions at all.. they look like a variable with an attached template string at the end. If you still do not know what I mean, these are the constructs I'm talking about:

```ts
tagFunction``;
```

They look pretty funny, don't they? Let's dive deeper into the core of it.

# What's under the hood

### How to call tag functions

Imagine you have a tag function that helps you to log certain events. You'd use it like:

```js
log`User visited the homepage`;
```

But since you want to stay as minimalistic as possible, you might want to add some variables to the string. Namely _userId_, _eventName_ and _pageName_. This would then look like:

> ```js
> log`User ${userId} ${eventName} the page ${pageName}`;
> ```

> This function is **_equivalent_** to the following one.

> ```js
> log(["User ", " ", " the page "], userId, eventName, pageName);
> ```

If we look at this example the syntax gets clear quite fast. The arguments of the "decoded" tag functions must be:

1. **An array of strings**, which are split from each other wherever an argument is inserted
2. _N_ arguments

```ts
tagFunction([string1, string2, ...], argument1, argument2, ...);
```

This also tells us how we can define our own tag function.

### How to define tag functions

Since we now know how to call tag functions, we can define the corresponding function very easily.

To stick with our example:

```ts
const log = (strings: string[], ...arguments: any[]) => {};
```

Here we are using the [spread operator](https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Operators/Spread_operator) in order to parse all arguments into one array.

Now we could already reproduce the functionality of template literals:

```ts
const log = (strings: string[], ...arguments: string[]) =>
    arguments.map((argument, index) => strings[index] + argument).join("");
```

That's cool, we've created our own tag function that works like template literals!

However, the real strength of tag functions, is that you can variably evaluate the arguments and strings. There are literally no limits to what you can do with tag functions once you understood the concept.

You could, for example, provide functions as arguments and execute them later with custom parameters, like _styled-components_ does.
A basic example:

```ts
// The user variable is undefined at this place but can still be accessed.
const message = getMessage`Hello, ${(user) => user.name}`;

const getMessage = (strings: string[], ...arguments: any[]) => {
    const user = {
        name: "Dan",
    };

    return arguments
        .map((argument, index) => {
            let result = "";

            if (typeof argument === "function") {
                // Call the function with the local user variable as argument.
                result = argument(user);
            } else {
                result = argument.toString();
            }

            return strings[index] + result;
        })
        .join("");
};
```

# Why would you use tag functions?

Of course you can also use tag functions for completely different purposes than returning strings.
Once you understood the concept, it can be a powerful tool to make certain workflows easier and cleaner.

The main reason to use tag functions is actually that they look very clean and at the same time give you the ability to handle the strings and arguments in a variable way. I think that these aspects were also the main reason why styled-components are based on tag functions.

---

I hope that I could give a little insight into tag functions, and why I find them to be very useful. - Eyk
