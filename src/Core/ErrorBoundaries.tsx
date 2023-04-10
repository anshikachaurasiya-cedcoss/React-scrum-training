import React from 'react';
import { BrokenPage1 } from '../../src/Components/EmptyState/EmptyPages';
import { errorStatus } from '../Actions/Utility';
import { connect } from 'react-redux';
type errorType = 'fullPage' | 'modulePage' | '';
class ErrorBoundary extends React.Component<any, any> {
    static props: any;
    constructor(props: any) {
        super(props);
        this.state = { hasError: false, message: '' };
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    static getDerivedStateFromError(error: any) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true };
    }

    componentDidCatch(error: any) {
        this.props.error(error.toString(), this.props.errorType);

        // You can also log the error to an error reporting service
        this.setState({ message: error.toString() });
    }

    render() {
        const { message } = this.state;
        if (this.state.hasError) {
            return (
                <div className="custom_session_expire after_login_broken">
                    <div className="inner_s">
                        <BrokenPage1 />
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

function mapStateToProps(dispatch: any, state: any) {
    return {
        error: (message: string, errorType: errorType) =>
            dispatch(
                errorStatus(window.location.href, true, errorType, message)
            ),
    };
}

export default connect(null, mapStateToProps)(ErrorBoundary);
