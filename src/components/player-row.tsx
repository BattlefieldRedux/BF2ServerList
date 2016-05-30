import * as React from "react";

import { Player } from "../types/response"

export interface PlayerRowProps {
    player: Player;
}

export default class PlayerRow extends React.Component<PlayerRowProps, any> {

    constructor(props: PlayerRowProps) {
        super(props);
    }

    render() {
        return <tr>
            <th>{this.props.player.name}</th>
            <th>{this.props.player.teamScore}</th>
            <th>{this.props.player.kills}</th>
            <th>{this.props.player.deaths}</th>
            <th>{this.props.player.totalScore}</th>
            <th>{this.props.player.ping}</th>
        </tr>;
    }
}
