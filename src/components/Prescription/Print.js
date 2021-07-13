import React, { Component } from "react";
import "./print.css";
import { print_styles as styles } from './styles';

export default class Print extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="printDiv" style={styles.prescriptionDesign}>
        {this.props.header && (
          <img
            style={styles.headerImage}
            src={URL.createObjectURL(this.props.header)}
          />
        )}
        {/* Drugs List Start */}
        <div style={{ display: "flex", flexDirection: "column", margin: 40 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <span>Drug</span>
            <span>Quantity Per Day</span>
            <span>Duration</span>
          </div>
          {this.props.rows.map((row) => {
            return (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <span>{row.drugName}</span>
                <span>{row.Quantity}</span>
                <span>{row.Duration}</span>
              </div>
            );
          })}
        </div>
        {/* Drugs List End */}
        {this.props.footer && (
          <img
            style={styles.footerImage}
            src={URL.createObjectURL(this.props.footer)}
          />
        )}
      </div>
    );
  }
}
