We all know the default way to fetch and display images:

```jsx
<img src="/image.jpg" />
```

It is used across frameworks and libraries throughout the industry. But what if you want to improve your UX and display loading indicators at the position of the image while the image is still loading? Or what if you want to output a message if there was an error while loading the image? Unfortunately this is not that easy with the default way of loading images.

But no worries, because there is a solution. You can just load the image in parallel _with a React hook_, which will also tell you when the image has finished loading and if there has been an error.

# The hook

First of all I would like to introduce the hook:

```ts
import { useState, useEffect } from "react";

export const useImage = (src: string) => {
    const [hasLoaded, setHasLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [hasStartedInitialFetch, setHasStartedInitialFetch] = useState(false);

    useEffect(() => {
        setHasStartedInitialFetch(true);
        setHasLoaded(false);
        setHasError(false);

        // Here's where the magic happens.
        const image = new Image();
        image.src = src;

        const handleError = () => {
            setHasError(true);
        };

        const handleLoad = () => {
            setHasLoaded(true);
            setHasError(false);
        };

        image.onerror = handleError;
        image.onload = handleLoad;

        return () => {
            image.removeEventListener("error", handleError);
            image.removeEventListener("load", handleLoad);
        };
    }, [src]);

    return { hasLoaded, hasError, hasStartedInitialFetch };
};
```

What does this hook do? Well, it basically loads the image into the cache or retrieves it from the cache if it has already been loaded.

At the same time it provides useful information, such as whether the image has been loaded, whether an error occurred during loading or whether the initial fetch has started. You could then use this information to place a loading indicator in the place of the image as long as the image has not yet loaded. An example integration could look like the following:

```jsx
const Demo = () => {
    const imageUrl = "/image.png";

    const { hasLoaded, hasError } = useImage(imageUrl);

    if (hasError) {
        return null;
    }

    return (
        <>
            ...
            {!hasLoaded && <LoadingIndicator />}
            {hasLoaded && <img src={imageUrl} />}
        </>
    );
};
```

# But doesn't the image load twice?

No. One might expect this, since the source was entered in both the hook and the image element.
However, only one request is sent, no matter how often a source is referenced. Fortunately, this also leads to the result that the _hasLoaded_ is always turning true, if somewhere (no matter where exactly) on the page this exact image was loaded.

# Conclusion

If you want to load images in an easy way and at the same time know the exact loading state, I can highly recommend this hook. In fact, all article thumbnails on [typesafe.blog](https://typesafe.blog) are loaded with this hook. In case you have a slow internet connection, you will see a loading indicator instead of the image until the image has loaded.
