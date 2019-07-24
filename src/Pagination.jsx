import React, { Component } from "react";

import "./Pagination.scss";
export default class Pagination extends Component {
    constructor(props) {
        super(props);
        this.state = {
            total: 0,
            current: 1,
            maxToShow: 5,
            min: 1
        };
        if (this.props.total) {
            this.state.total = this.props.total;
        }
        if (this.props.current) {
            this.state.current = this.props.current;
        }
        if (this.props.maxToShow) {
            this.state.maxToShow = this.props.maxToShow;
        }
        if (this.props.min) {
            this.state.min = this.props.min;
        }
    }
    hasNext() {
        return this.state.current < this.state.total;
    }
    hasPrev() {
        return this.state.current > 1;
    }
    updateCurrent(i) {
        this.newCurrent(i);
    }
    prevPage() {
        if (this.state.current > 1) {
            this.newCurrent(this.state.current - 1, "prev");
        }
    }
    nextPage() {
        if (this.state.current < this.state.total) {
            this.newCurrent(this.state.current + 1);
        }
    }
    newCurrent(val, action = null) {
        this.props.onChange(val);
        const pageMax = this.state.maxToShow + this.state.min - 1;
        if (val === pageMax && pageMax !== this.state.total) {
            this.setState({
                min: val
            });
        }
        if (val === this.state.min - 1 && this.state.min > 1) {
            this.setState({
                min: this.state.min - this.state.maxToShow + 1
            });
        }
        this.setState({
            current: val
        });
    }
    componentDidUpdate(prevProps) {
        if (prevProps.total !== this.props.total) {
            this.setState({ total: this.props.total });
        }
        if (prevProps.current !== this.props.current) {
            this.setState({ current: this.props.current });
        }
        if (prevProps.maxToShow !== this.props.maxToShow) {
            this.setState({ maxToShow: this.props.maxToShow });
        }
        if (prevProps.min !== this.props.min) {
            this.setState({ min: this.props.min });
        }
    }
    render() {
        const arr = [];
        const max =
            this.state.min + this.state.maxToShow > this.state.total
                ? this.state.total + 1
                : this.state.min + this.state.maxToShow;
        for (let index = this.state.min; index < max; index++) {
            arr.push(index);
        }
        return (
            <div id="pagination">
                <span
                    className={this.hasPrev() ? "" : "disabled"}
                    onClick={() => this.prevPage()}
                >
                    &#60;
                </span>
                {arr.map(i => {
                    return (
                        <span
                            key={i}
                            className={
                                i === this.state.current ? "current" : ""
                            }
                            onClick={() => this.updateCurrent(i)}
                        >
                            {i}
                        </span>
                    );
                })}
                <span
                    className={this.hasNext() ? "" : "disabled"}
                    onClick={() => this.nextPage()}
                >
                    &#62;
                </span>
            </div>
        );
    }
}
