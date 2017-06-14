import React, {PropTypes} from 'react';

const Planet = (props) => {
    let result = [];

    for (const [index, planet] of props.planetData.entries()) {
        const sizeStyle = {
            fontSize: (20-index) + 'px',
            fontWeight: (900-(index*100)) || 100,
        }

        result.push(
            <div key={index}>
                <div className="row">
                    <div className="col-sm-3">
                        <span style={sizeStyle}>{planet.name}</span>
                    </div>
                    <div className="col-sm-3">
                        <span style={sizeStyle}>{planet.population}</span>
                    </div>
                    <div className="col-sm-6"></div>
                </div>
            </div>
        );
    }

    return(
        <div className="planetDiv">
            <div className="row">
                <div className="col-sm-3 header">
                    <span>Planet Name</span>
                </div>
                <div className="col-sm-3 header">
                    <span>Planet Population</span>
                </div>
                <div className="col-sm-6"></div>
            </div>
            {result}
        </div>);
}

Planet.propTypes = {
    planetData: PropTypes.array,
};

export default Planet
