import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import Container from './style';
import Home from './Home/Home';
import PostDetailed from './PostDetailed/PostDetailed';
import ContactFormik from './Forms/ContactFormik';
import RegisterFormik from './Forms/RegisterFormik';
import CreatePostFormik from './Forms/CreatePostFormik';
import LoginFormik from './Forms/LoginFormik';

const RouteUnauthenticated = ({ isAuthenticated, ...props }) =>
    !isAuthenticated ? <Route {...props} /> : <Redirect to="/" />;

const RouteAuthenticated = ({ isAuthenticated, ...props }) =>
    isAuthenticated ? <Route {...props} /> : <Redirect to="/" />;

RouteUnauthenticated.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
};

RouteAuthenticated.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
};

class Main extends Component {
    componentDidMount() {
        const { getPosts } = this.props;

        getPosts();
    }

    getPost(id) {
        const { posts } = this.props;

        return posts.find(post => post._id === id);
    }

    render() {
        const { createComment, createPost, isAuthenticated } = this.props;

        return (
            <Container>
                <Switch>
                    <Route
                        exact
                        path="/"
                        render={() => <Home {...this.props} />}
                    />
                    <Route exact path="/contactus" component={ContactFormik} />
                    <RouteUnauthenticated
                        {...this.props}
                        exact
                        path="/login"
                        render={() => <LoginFormik {...this.props} />}
                    />
                    <RouteUnauthenticated
                        {...this.props}
                        exact
                        path="/register"
                        render={() => <RegisterFormik {...this.props} />}
                    />
                    <RouteAuthenticated
                        {...this.props}
                        exact
                        path="/create-post"
                        render={() => (
                            <CreatePostFormik
                                {...this.props}
                                createPost={createPost}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/post/:id"
                        render={props => (
                            <PostDetailed
                                {...props}
                                post={this.getPost(props.match.params.id)}
                                createComment={createComment}
                                isAuthenticated={isAuthenticated}
                            />
                        )}
                    />
                </Switch>
            </Container>
        );
    }
}

export default Main;
