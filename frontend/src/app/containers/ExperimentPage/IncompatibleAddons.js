// @flow
import React, { Component } from "react";
import { Localized } from "fluent-react/compat";

import "./index.scss";

import type { IncompatibleAddonsProps } from "./types";

export default class IncompatibleAddons extends Component<IncompatibleAddonsProps> {

  render() {
    const { incompatible } = this.props.experiment;
    const installed = this.getIncompatibleInstalled(incompatible);
    if (installed.length === 0) return null;

    const helpUrl = "https://support.mozilla.org/kb/disable-or-remove-add-ons";

    return (
      <section className="incompatible-addons">
        <header>
          <Localized id="incompatibleHeader">
            <h3>
              This experiment may not be compatible with add-ons you have installed.
            </h3>
          </Localized>
          <Localized id="incompatibleSubheader" a={<a href={helpUrl}/>}>
            <p>
              We recommend <a>disabling these add-ons</a> before activating this experiment:
            </p>
          </Localized>
        </header>
        <main>
          <ul>
            {installed.map(guid => (
              <li key={guid}>{incompatible[guid]}</li>
            ))}
          </ul>
        </main>
      </section>
    );
  }

  getIncompatibleInstalled(incompatible: Object) {
    if (!incompatible) {
      return [];
    }
    const installed = this.props.installedAddons || [];
    // $FlowFixMe
    return Object.keys(incompatible).filter((guid: string) => (installed.includes(guid)));
  }

}
