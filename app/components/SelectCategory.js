import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions/actions';


const SelectCategory = ({ categories, category, onSelect }) => (
  <ul className="categories">
    {categories.map(cat => (
      <li key={cat}>
        <a
          role="button"
          className={cat === category ? 'active' : null}
          onClick={() => onSelect(cat)}
        > {cat}</a>
      </li>
    ))}
  </ul>
);

SelectCategory.propTypes = {
  categories: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
};

const getCategories = (posts) => {
  const categories = posts.map(post => post.category);
  categories.splice(0, 0, 'All');
  return categories;
};
const mapStateToProps = (state) => {
  const { posts } = state.posts;
  const { category } = state.categories;

  return {
    category,
    categories: getCategories(posts)
  };
};
const mapDispatchToProps = dispatch => ({
  onSelect: (category) => {
    dispatch(actions.changeCategory(category));
  }
});


export default connect(mapStateToProps, mapDispatchToProps)(SelectCategory);
