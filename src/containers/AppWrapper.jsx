import React from 'react';
import Helmet from "react-helmet";
import Joyride from 'react-joyride';

import NavBar from '../components/NavBar';
import SideBar from './SideBar';
import ChatWindow from '../containers/ChatWindow';

import { isAdmin, isProjectManager, isProjectOwner } from '../utils/auth';

export default class AppWrapper extends React.Component {

    handleAppClick() {
        const { onAppClick } = this.props;
        if(onAppClick) {
            onAppClick();
        }
    }

    render() {
        const {children, location} = this.props;

        let steps = [
            {
                title: 'Welcome to Tunga',
                text: 'This is the main navigation area',
                selector: '#sidebar',
                position: 'right'
            },
            {
                title: 'Home',
                text: 'A quick glance at all your notifications',
                selector: '#sidebar-home',
                position: 'right'
            },
            {
                title: 'Work',
                text: 'Browse tasks and projects on Tunga',
                selector: '#sidebar-work',
                position: 'right'
            }
        ];

        if(isProjectOwner() || isProjectManager() || isAdmin()) {
            steps = [
                ...steps,
                {
                    title: 'Post Work',
                    text: 'Create projects or tasks',
                    selector: '#sidebar-post-work',
                    position: 'right'
                }
            ]
        }

        steps = [
            ...steps,
            {
                title: 'Messages',
                text: 'Start conversations and check on your new messages',
                selector: '#sidebar-messages',
                position: 'right'
            },
            {
                title: 'Tribe',
                text: 'Browse a catalog of available developers and search for new developers to add to your team based on the skills you desire',
                selector: '#sidebar-tribe',
                position: 'right'
            },
            {
                title: 'Payments',
                text: 'Find invoices for all your payments',
                selector: '#sidebar-payments',
                position: 'right'
            },
            /*{
                title: 'Support',
                text: 'Find helpful information about Tunga',
                selector: '#sidebar-support',
                position: 'right'
            },*/
            {
                title: 'Search',
                text: 'Search for developers, tasks and messages',
                selector: '#navbar-search',
                position: 'bottom'
            },
            {
                title: 'My Account',
                text: 'Manage your profile and settings',
                selector: '#navbar-account',
                position: 'bottom'
            }
        ];

        if(!isAdmin()) {
            steps = [
                ...steps,
                {
                    title: 'Support',
                    text: 'Talk with someone at Tunga',
                    selector: '#support-chat',
                    position: 'top'
                }
            ]
        }

        return (
            <div className="app-wrapper dashboard" onClick={this.handleAppClick.bind(this)}>
                <Helmet
                    title="Tunga"
                    meta={[
                                {
                                "name": "description",
                                "content": "Tunga is a market network that allows you to build a flexible team " +
                                 "of skilled African software programmers, that you can mobilize on-demand."
                                 }
                              ]}
                />

                <Joyride ref="joyride"
                         steps={steps}
                         run={true}
                         debug={!__PRODUCTION__}
                         autoStart={!__PRODUCTION__}
                         type="continuous"
                         showStepsProgress={true}
                         showSkipButton={true}/>

                <NavBar location={location}/>

                <SideBar location={location}/>

                <div className="main-content">
                    <div className="main">
                        {children}
                    </div>
                </div>

                {!isAdmin()?(
                    <ChatWindow />
                ):null}
            </div>
        );
    }
}
