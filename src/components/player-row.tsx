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
        var connecting = this.props.player.ping == 0 && !this.props.player.isBot ? "connecting" : "";
        var botText = this.props.player.isBot ? "BOT " : "";
        // var country = this.props.player.countryCode != null ? <span className={"flag flag-" + this.props.player.countryCode.toLowerCase()}></span> : "";
        var rank = <span className={"rank rank-" + this.props.player.rank}></span>
        return <tr className={connecting}>
            <td>{rank}</td>
            <td><a href="#">{botText}{this.props.player.name}</a></td>
            <td>{this.props.player.teamScore}</td>
            <td>{this.props.player.kills}</td>
            <td>{this.props.player.deaths}</td>
            <td>{this.props.player.totalScore}</td>
            <td>{this.props.player.ping}</td>
        </tr>;
    }
}
