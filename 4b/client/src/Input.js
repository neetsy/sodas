import React, { Component } from 'react';

export class Input extends Component {
    constructor(props) {
        super(props);

        this.state = {
            value: undefined,
            active: props.active || false,
            label: props.label || ''
        };
    }

    render = () => {
        return (
            <div className='field'>
                <input 
                    type='text'
                    value={this.state.value}
                    placeholder={this.props.label}
                />
            </div>
        );
    }
}