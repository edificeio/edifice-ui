export const useMathsStyles = () => {
  const loadMathsStyles = () => {
    const katexURL =
      "https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css";
    // const hasKatexLink = false;
    // const links = document.head.getElementsByTagName("link");

    // for (const link of links) {
    //   if (link.href === katexURL) {
    //     hasKatexLink = true;
    //     return;
    //   }
    // }

    // if (!hasKatexLink) {
    const link = document.createElement("link");
    link.href = katexURL;
    link.rel = "stylesheet";
    link.type = "text/css";

    document.links;
    document.head.appendChild(link);
    // }
  };

  return {
    loadMathsStyles,
  };
};
