import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { HomePage } from './Component/HomePage/HomePage';
import { VoxelPage } from './Component/Voxel/VoxelPage';

export class App extends React.Component {

    render() {
        return (
            <Router>
                <div>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/Voxel" component={VoxelPage} />

                </div>
            </Router>
        );
    }
}   