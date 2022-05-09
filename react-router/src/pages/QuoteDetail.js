import React, {Fragment, useEffect} from 'react';
import {useParams, Outlet} from "react-router-dom";

import LoadingSpinner from "../components/UI/LoadingSpinner";
// import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";

import useHttp from "../hooks/use-http";
import {getSingleQuote} from "../lib/api";

const QuoteDetail = () => {
    // const match = useRouteMatch()
    const params = useParams()

    const {quoteId} = params

    const {sendRequest, status, data: loadedQuote, error} = useHttp(getSingleQuote, true)

    useEffect(() => {
        sendRequest(quoteId)
    }, [sendRequest, quoteId])

    if (status === 'pending') {
        return <div className='centered'>
            <LoadingSpinner/>
        </div>
    }

    if (error) {
        return <p className='centered'>{error}</p>
    }

    if (!loadedQuote.text) {
        return <p className='centered'>No quote found!</p>
    }

    return (
        <Fragment>
            <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author}/>
            <Outlet/>
            {/*<Route path={match.path} exact>*/}
            {/*    <div className='centered'>*/}
            {/*        <Link*/}
            {/*            className='btn--flat'*/}
            {/*            to={`${match.url}/comments`}>*/}
            {/*            Load Comment*/}
            {/*        </Link>*/}
            {/*    </div>*/}
            {/*</Route>*/}
            {/*<Route path={`${match.path}/comments`}>*/}
            {/*    <Comments/>*/}
            {/*</Route>*/}
        </Fragment>
    );
};

export default QuoteDetail;