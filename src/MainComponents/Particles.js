import React from 'react'
import Particles from "react-tsparticles";
import {Themes} from "../Theme/theme";

export default  function Particle() {
return(
    <Particles
        id="tsparticles"
        options={{
            background: {
                color: {
                    value: Themes.ParticleBackgroundColor,
                },
            },
            fpsLimit: 60,
            interactivity: {
                detectsOn: "canvas",
                events: {
                    onClick: {
                        enable: true,
                        mode: "push",
                    },
                    onHover: {
                        enable: true,
                        mode: "repulse",
                    },
                    resize: true,
                },
                modes: {
                    bubble: {
                        distance: 400,
                        duration: 2,
                        opacity: 0.8,
                        size: 40,
                    },
                    push: {
                        quantity: 4,
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4,
                    },
                },
            },
            particles: {
                color: {
                    value: Themes.ParticlesColor,
                },
                links: {
                    color: Themes.ParticlesColor,
                    distance: 150,
                    enable: true,
                    opacity: 0.5,
                    width: 1,
                },
                collisions: {
                    enable: true,
                },
                move: {
                    direction: "none",
                    enable: true,
                    outMode: "bounce",
                    random: false,
                    speed: 2,
                    straight: false,
                },
                number: {
                    density: {
                        enable: true,
                        value_area: 800,
                    },
                    value: 80,
                },
                opacity: {
                    value: 0.5,
                },
                shape: {
                    type: "triangle",
                },
                size: {
                    random: true,
                    value: 5,
                },
            },
            detectRetina: true,
        }}
    />
)
}