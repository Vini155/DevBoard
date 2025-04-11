import { useDispatch, useSelector } from "react-redux"
import GitHubLogin from 'react-github-login';
import { useEffect, useState } from "react";
import { getCommits, getGitHubToken, getPullRequests } from "../actions/counterActions";
import { formatDistanceToNow } from 'date-fns';
import './Counter.css';

export const Counter = () => {
    const githubToken = useSelector((state) => state.github.token);
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const pulls = useSelector((state) => state.github.pullRequests);
    const commits = useSelector((state) => state.github.commits);
    const flatCommits = commits?.flat();
    const repos = useSelector((state) => state.github.repos);
    const filterPullRequest = pulls.filter((pull) => pull.message !== 'No PRs found').flat();
    console.log('pulls', filterPullRequest);
    const dispatch = useDispatch();

    useEffect(() => {
        if (isLoggedIn) {
            dispatch(getGitHubToken(isLoggedIn));
        }
    }, [isLoggedIn, dispatch, githubToken]);

    useEffect(() => {
        if (repos.length) {
            dispatch(getPullRequests());
            dispatch(getCommits())
        }
    }, [repos, dispatch]);

    const Card = ({ title, children }) => (
        <div className="card">
            <h2 className="card-title">{title}</h2>
            {children}
        </div>
    );

    const TimeAgo = ({ timestamp }) => {
        return (
            <span>
                {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
            </span>
        );
    };


    return (
        <>
            <div className="devboard">
                <div className="header">DEVBOARD</div>
                <div className="dashboard-grid">
                    {/* Tasks */}
                    <Card title="Tasks">
                        <ul className="task-list">
                            <li>Implement login functionality</li>
                            <li>Refactor authentication reducers</li>
                            <li>Cleanup list of tasks</li>
                        </ul>
                    </Card>
                    {/* Pull Requests */}
                    <Card title="Pull Requests">
                        {filterPullRequest.map((pr, i) => (
                            <div key={i} className="pull-request">
                                <div className="pr-info">
                                    <p className="pr-title">{pr.title}</p>
                                    <span className="pr-author">{pr.user.login}</span>
                                </div>
                                <span className="status-badge">{pr.state}</span>
                            </div>
                        ))}
                    </Card>
                    {/* Commits */}
                    <Card title="Commits">
                        {flatCommits?.map((commit) => (
                            <div key={commit.id} className="pull-request">
                                <div className="pr-info">
                                    <p className="commit-title">{commit.message}</p>

                                </div>
                                <span className="status-badge">{commit.name} • <TimeAgo timestamp={commit.date} /></span>
                            </div>
                        ))}
                    </Card>
                    {/* Articles */}
                    <Card title="Latest Articles">
                        <div className="article">
                            <span>React State Management with Redux Toolkit</span>
                            <span className="date">Apr 21</span>
                        </div>
                        <div className="article">
                            <span>Understanding JavaScript Closures</span>
                            <span className="date">Apr 18</span>
                        </div>
                        <div className="article">
                            <span>An Introduction to TypeScript</span>
                            <span className="date">Apr 10</span>
                        </div>
                    </Card>
                </div>
                <button className="logout-button">Log out</button>
            </div>
            <GitHubLogin
                buttonText={isLoggedIn ? "Logout" : "Login with GitHub"}
                className="github-login"
                clientId="Ov23li0Q4wmDJ6ycVoJR"
                redirectUri="http://localhost:3000"
                scope="user:email"
                onSuccess={(response) => setIsLoggedIn(response.code)}
                onFailure={(response) => console.log(response)} />

        </>
    )
}