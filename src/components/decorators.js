'use strict';

import React from 'react';
import Radium from 'radium';
import {VelocityComponent} from 'velocity-react';

const Loading = (props) => {
    return (
        <div style={props.style}>
            loading...
        </div>
    );
};

Loading.propTypes = {
    style: React.PropTypes.object
};

const Toggle = (props) => {
    const style = props.style;
    const height = style.height;
    const width = style.width;
    let midHeight = height * 0.5;
    let points = `0,0 0,${height} ${width},${midHeight}`;
    return (
        <div style={style.base}>
            <div style={style.wrapper}>
                <svg height={height} width={width}>
                    <polygon
                        points={points}
                        style={style.arrow}
                    />
                </svg>
            </div>
        </div>
    );
};

Toggle.propTypes = {
    style: React.PropTypes.object
};

const Header = (props) => {
    const style = props.style;
    return (
        <div style={style.base}>
            <div style={style.title}>
                {props.node.name}
            </div>
        </div>
    );
};

Header.propTypes = {
    style: React.PropTypes.object,
    node: React.PropTypes.object.isRequired
};

@Radium
class HeaderContainer extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        const {style, decorators, terminal, onClick, node} = this.props;
        return (
            <div
                ref="clickable"
                onClick={onClick}
                style={style.container}>
                { !terminal ? this.renderToggle() : null }
                <decorators.Header
                    node={node}
                    style={style.header}
                />
            </div>
        );
    }
    renderToggle(){
        const {style, decorators, animations} = this.props;
        return (
            <VelocityComponent ref="velocity"
                duration={animations.toggle.duration}
                animation={animations.toggle.animation}>
                <decorators.Toggle style={style.toggle}/>
            </VelocityComponent>
        );
    }
}

HeaderContainer.propTypes = {
    style: React.PropTypes.object.isRequired,
    decorators: React.PropTypes.object.isRequired,
    terminal: React.PropTypes.bool.isRequired,
    onClick: React.PropTypes.func.isRequired,
    animations: React.PropTypes.object.isRequired,
    node: React.PropTypes.object.isRequired
};

export default {
    Loading,
    Toggle,
    Header,
    HeaderContainer
};