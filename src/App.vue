<script setup lang="jsx">
import { run, compile } from "@mdx-js/mdx";
import remarkGFM from "remark-gfm";
import * as runtime from "vue/jsx-runtime";

import HelloWorld from "./components/HelloWorld.vue";
import FContent from "./FContent.jsx";

async function main() {
  const aiResponse = `Sure, Here's the summarized version of your JSON:
  
  <Card header="Flight Reservation Details">
    **Reservation ID**: 1234567890  
    **Passenger Name**: John Doe   
    **Flight Number**: ABC123  
    **Origin**: Los Angeles  
    **Destination**: New York  
    **Departure Date and Time**: 2022-01-01 at 09:00  
    **Arrival Date and Time**: 2022-01-01 at 15:00
    <Badge color="green">Confirmed</Badge>
  </Card>
  
  Here is a GitHub-flavored markdown:
  
  #### Table
  | Flight | Departure     | Arrival |
  |--------|---------------|---------|
  | ABC123 | Los Angeles   | New York|
  
  #### Details
  <details>
    <summary>Click to expand</summary>
  
    This is a demo for GitHub-flavored markdown details tag.
  </details>
  
  #### Strikethrough
  ~~This line is strikethrough.~~`;

  let compiled;
  try {
    compiled = String(
      await compile(aiResponse, {
        outputFormat: "function-body",
        // If we enable this, we get slightly nicer error messages.
        // But we also get _jsxDev is not a function.
        // This seems surmountable but also not something I want to attend to now.
        development: true,
        remarkPlugins: [remarkGFM],
      })
    );
  } catch {
    console.log(
      "Cannot parse MDX. If the stream is still coming in, this is fine. But if you were expecting this to be parsable, then there may be a bug.",
      aiResponse
    );
    return;
  }
  const { default: Content } = await run(compiled, runtime);

  const components = {
    table: (props) => (
      <table className="min-w-full divide-y divide-gray-300" {...props} />
    ),
    th: (props) => (
      <th
        scope="col"
        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
        {...props}
      />
    ),
    td: (props) => (
      <td
        className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
        {...props}
      />
    ),
    h2: (props) => <h2 className="text-lg font-bold" {...props} />,
    h3: (props) => <h2 className="text-md font-bold" {...props} />,
    h4: (props) => <h2 className="text-sm uppercase font-bold" {...props} />,
    // ...BuildingBlocks,
  };

  console.log({ Content });
  // setMdx(<Content components={components} />);
  return function FContent(props, context) {
    return <Content components={components} />;
  };
}

// const FContent = await main();
</script>

<template>
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />

  <el-button>我是 ElButton</el-button>
  <FContent />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
