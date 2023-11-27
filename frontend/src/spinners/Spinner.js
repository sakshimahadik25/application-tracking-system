import React from 'react';

function Spinner({ color, otherCSS }) {
	return (
		<div class={`spinner-border ${color} ${otherCSS}`} role='status'>
			<span class='visually-hidden'>Loading...</span>
		</div>
	);
}

export default Spinner;
