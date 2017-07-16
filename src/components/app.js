import React from 'react';
import {connect} from 'react-redux';
import {fetchNews, changePage} from '../actions';

class App extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			link: ''
		}
	}
	onLinkChange(e){
		this.setState({
			link: e.target.value
		})
	}
	clickHandler(){
		this.props.fetchNews(this.state.link);
	}
	onPageClick(event){
		this.props.changePage(event.target.id);
	}
	onPagesChange(){
		const pages = [];
		for (let i=1; i<=Math.ceil(this.props.news.newsItems.length / 3); i++){
			pages.push(i);
		}
		return pages.map((number)=>{
			return(
				<span className={this.props.news.currentPage==number ? 'activePage page' : 'page'} onClick={this.onPageClick.bind(this)} key={number} id={number}>{number}</span>
			)
		});
	}
	render(){
		const indexOfLastNewsItem = this.props.news.currentPage * 3;
		const indexOfFirstNewsItem = indexOfLastNewsItem - 3;
		const currentNews = this.props.news.newsItems.slice(indexOfFirstNewsItem, indexOfLastNewsItem);
		const renderNews = currentNews.map((newsItem, index) => {
			return (
				<li key={index}>{newsItem.title}</li>
			)
		});
		return(
			<div>
				<label>put the link below</label>
				<input onChange={this.onLinkChange.bind(this)} value={this.state.link} className='linkInput'/>
				<button className='fetchButton' onClick={this.clickHandler.bind(this)}>Fetch news</button>
				<ul>{renderNews}</ul>
				<div className='errMessage'>{this.props.news.err}</div>
				<div className='pages'>{this.onPagesChange()}</div>
			</div>
		)
	}
};

function mapStateToProps({news}) {
	return {news};
};

export default connect(mapStateToProps, {fetchNews, changePage})(App);