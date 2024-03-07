import { run, compile } from "@mdx-js/mdx";
import remarkGFM from "remark-gfm";
import * as runtime from "vue/jsx-runtime";

import {
  ElButton,
  ElDropdown,
  ElDropdownMenu,
  ElDropdownItem,
  ElIcon,
} from "element-plus";

async function FContent() {
  const aiResponse = `Sure, Here's the summarized version of your JSON:
  
<Card header="Flight Reservation Details">
  **Reservation ID**: 1234567890  
  **Passenger Name**: John Doe   
  **Flight Number**: ABC123  
  **Origin**: Los Angeles  
  **Destination**: New York  
  **Departure Date and Time**: 2022-01-01 at 09:00  
  **Arrival Date and Time**: 2022-01-01 at 15:00
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

  <ElButton>Asdf</ElButton>

  <ElDropdown trigger="click">
  {{
    default: () => (<span className="el-dropdown-link">
      Dropdown List<ElIcon className="el-icon--right">|</ElIcon>
    </span>),
    dropdown: () => (<ElDropdownMenu>
        <ElDropdownItem>Action 1</ElDropdownItem>
        <ElDropdownItem>Action 2</ElDropdownItem>
        <ElDropdownItem>Action 3</ElDropdownItem>
        <ElDropdownItem>Action 4</ElDropdownItem>
        <ElDropdownItem>Action 5</ElDropdownItem>
      </ElDropdownMenu>)
  }}
  </ElDropdown>
  
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
    table: (props, { slots }) => (
      <table className="min-w-full divide-y divide-gray-300" {...props}>
        {() => slots.default()}
      </table>
    ),
    th: (props, { slots }) => (
      <th
        scope="col"
        className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
        {...props}
      >
        {() => slots.default()}
      </th>
    ),
    td: (props, { slots }) => (
      <td
        className="whitespace-nowrap px-3 py-4 text-sm text-gray-500"
        {...props}
      >
        {() => slots.default()}
      </td>
    ),
    h2: (props, { slots }) => (
      <h2 className="text-lg font-bold" {...props}>
        {() => slots.default()}
      </h2>
    ),
    h3: (props, { slots }) => (
      <h2 className="text-md font-bold" {...props}>
        {() => slots.default()}
      </h2>
    ),
    h4: (props, { slots }) => (
      <h2 className="text-sm uppercase font-bold" {...props}>
        {() => slots.default()}
      </h2>
    ),
    details: (props, { slots }) => (
      <details className="text-lg font-bold" {...props}></details>
    ),
    summary: (props, { slots }) => {
      return <summary className="asdf" {...props}></summary>;
    },

    Card: ({ header, footer }, { slots }) => {
      if (header || footer) {
        return (
          <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-white shadow">
            {header && (
              <div
                className="px-4 py-5 sm:px-6"
                onClick={() => {
                  console.log("header...");
                }}
              >
                {header}
              </div>
            )}

            <div className="px-4 py-5 sm:p-6">{() => slots.default()}</div>
            {footer && <div className="px-4 py-4 sm:px-6">{footer}</div>}
          </div>
        );
      }
      return (
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:p-6">{() => slots.default()}</div>
        </div>
      );
    },
    // ...BuildingBlocks,

    ElButton,
    ElDropdown,
    ElDropdownMenu,
    ElDropdownItem,
    ElIcon,
  };

  const MdxProvider = () => <Content components={components} />;

  // console.log({ Content });
  return MdxProvider;
}

export default await FContent();
