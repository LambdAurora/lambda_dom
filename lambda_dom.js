/*
 * Copyright © 2018 LambdAurora <aurora42lambda@gmail.com>
 *
 * This file is part of lambda_dom.
 *
 * Licensed under the MIT license. For more information,
 * see the LICENSE file.
 */

/**
 * Represents a builder of DOM elements.
 */
class DOMBuilder
{
	constructor(element)
	{
		this._element = element;
	}

	inner_html(html)
	{
		this._element.innerHTML = html;
		return this;
	}

	/**
	 * Sets the inner text of the element.
	 * @param text The inner text of the element.
	 * @returns {DOMBuilder} The current instance of the dom element builder.
	 */
	inner_text(text)
	{
		this._element.innerText = text;
		return this;
	}

	/**
	 * Adds a class to the element.
	 * @param class_name The class to add.
	 * @returns {DOMBuilder} The current instance of the dom element builder.
	 */
	add_class(class_name)
	{
		this._element.className += ` ${class_name}`;
		return this;
	}

	/**
	 * Sets the classes of the element.
	 * @param classes The classes to set.
	 * @returns {DOMBuilder} The current instance of the dom element builder.
	 */
	classes(classes)
	{
		if (classes.constructor === Array) this._element.className = classes.join(' ');
		else this._element.className = classes;
		return this;
	}

	/**
	 * Appends an element to the current element.
	 * @param element The element to append.
	 * @returns {DOMBuilder} The current instance of the dom element builder.
	 */
	append(element)
	{
		if (element instanceof DOMBuilder)
			this._element.append(element.to_element());
		else if (element instanceof Element)
			this._element.append(element);
		else throw `Cannot append ${element} to the element because of wrong type.`;
		return this;
	}

	/**
	 * Appends multiple elements to the current element.
	 * @param elements The elements to append.
	 * @returns {DOMBuilder} The current instance of the dom element builder.
	 */
	append_all(elements)
	{
		if (elements.constructor !== Array) throw `Cannot append ${elements} to the element because of wrong type. (Expected: array).`;
		elements.forEach(this.append);
		return this;
	}

	/**
	 * Adds a handling of the specified event to the element.
	 * @param event The event.
	 * @param callback The callback.
	 * @returns {DOMBuilder} The current instance of the dom element builder.
	 */
	on(event, callback)
	{
		this._element.addEventListener(event, callback);
		return this;
	}

	/**
	 * Returns the DOM element built.
	 * @returns {*} The DOM element.
	 */
	to_element()
	{
		return this._element;
	}
}

/**
 * Represents the main instance of LambdaDOM.
 */
class LambdaDOM
{
	constructor(document)
	{
		this._doc = document;
	}

	/**
	 * Create a new specified element.
	 * @param element The type of element.
	 * @returns {HTMLElement} The instance of the DOM element.
	 */
	create_element(element)
	{
		return this._doc.createElement(element);
	}

	/**
	 * Builds a new specified element.
	 * @param element The type of element.
	 * @returns {DOMBuilder} THe instance of the DOM element builder.
	 */
	build(element)
	{
		return new DOMBuilder(this.create_element(element));
	}

	/**
	 * Creates a new `div` element.
	 * @returns {DOMBuilder} The builder of the `div` element.
	 */
	div()
	{
		return this.build('div');
	}

	/**
	 * Creates a new `span` element.
	 * @returns {DOMBuilder} The builder of the `span` element.
	 */
	span()
	{
		return this.build('span');
	}

	/**
	 * Creates a new `span` element with the specified inner text.
	 * @param text The inner text.
	 * @returns {DOMBuilder} The element builder of the `span` element.
	 */
	span_text(text)
	{
		return this.span().inner_text(text);
	}

	/**
	 * Creates a new `span` element with an array of elements to append.
	 * @param elements The elements to append.
	 * @returns {DOMBuilder} The element builder of the `span` element.
	 */
	span_elems(elements)
	{
		return this.span().append_all(elements);
	}

	/**
	 * Creates a new `p` element.
	 * @returns {DOMBuilder} The builder of the `p` element.
	 */
	p()
	{
		return this.build('p');
	}


	p_text(text)
	{
		return this.p().inner_text(text);
	}
}