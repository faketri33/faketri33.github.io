import Exhibit from './Exhibit.jsx';
import Flow from './Flow.jsx';
import Code from './Code.jsx';

const REQUEST = `{"command": "ps", "args": ["-a", "--filter", "profile=DEV"]}`;

export default function JsupVisual({ item }) {
  return (
    <Exhibit caption={item.caption} stack>
      <Flow label={item.flowLabel} stages={item.stages} />
      <Code label={item.codeLabel}>{REQUEST}</Code>
    </Exhibit>
  );
}
