import * as React from "react";
import * as ReactDOM from "react-dom";

import ServerList, { ServerUri } from "./components/server-list";

var servers: ServerUri[] = [
    { name: "netsky-nl", hostIp: "108.61.199.14", queryPort: 29900 },
    { name: "netsky-se", hostIp: "31.220.7.51", queryPort: 29900 },
    { name: "trademark", hostIp: "81.19.219.187", queryPort: 29900 },
    { name: "xxxpert", hostIp: "176.57.184.120", queryPort: 29900 },
];

ReactDOM.render(
    <ServerList serverUris={servers} />,
    document.getElementById("app")
);