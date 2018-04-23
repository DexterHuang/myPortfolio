import React from 'react';
import { Styles } from '../Modal/Styles';

export class HomePage extends React.Component {

    render() {
        return (
            <div>
                <div style={styles.landingPage}>
                    <h1 style={styles.title}>
                        Hello World
                    </h1>
                </div>
            </div>
        );
    }
}

const styles: Styles = {
    landingPage: {
        display: "flex",
        height: "100vh",
        backgroundColor: "skyblue",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center",
        // tslint:disable-next-line:max-line-length
        backgroundImage: "url('https://images.unsplash.com/photo-1497493292307-31c376b6e479?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=428468d8a8b3842450b4f54a173f2622&auto=format&fit=crop&w=751&q=80')",
        backgroundSize: "cover"
    },
    title: {
        fontSize: 50,
        color: "white",
        textShadow: "0px 0px 100px black"
    }
};