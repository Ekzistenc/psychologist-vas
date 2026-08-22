<?php
// This file is generated. Do not modify it manually.
return array(
	'about' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/about',
		'version' => '0.1.0',
		'title' => 'Обо мне',
		'category' => 'snd-blocks',
		'example' => array(
			'viewportWidth' => 1200
		),
		'attributes' => array(
			'align' => array(
				'type' => 'string',
				'default' => 'full'
			),
			'anchor' => array(
				'type' => 'string',
				'default' => ''
			),
			'imageBg' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'url' => '',
					'alt' => '',
					'size' => 'large',
					'sizes' => array(
						
					)
				)
			)
		),
		'supports' => array(
			'html' => false,
			'align' => true,
			'anchor' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => array(
			'swiper',
			'file:./style-index.css'
		),
		'viewScript' => array(
			'glightbox',
			'swiper',
			'file:./view.js'
		),
		'render' => 'file:./render.php'
	),
	'about-slide' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/about-slide',
		'version' => '0.1.0',
		'title' => 'Обо мне слайд',
		'category' => 'snd-blocks',
		'icon' => 'format-image',
		'parent' => array(
			'snd/about-slider'
		),
		'example' => array(
			'viewportWidth' => 1200
		),
		'attributes' => array(
			'align' => array(
				'type' => 'string',
				'default' => 'full'
			),
			'anchor' => array(
				'type' => 'string',
				'default' => ''
			),
			'image' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'url' => '',
					'alt' => '',
					'size' => 'large',
					'sizes' => array(
						
					)
				)
			)
		),
		'supports' => array(
			'html' => false,
			'align' => true,
			'anchor' => true
		),
		'editorScript' => 'file:./index.js',
		'render' => 'file:./render.php'
	),
	'about-slider' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/about-slider',
		'version' => '0.1.0',
		'title' => 'Обо мне слайдер',
		'category' => 'snd-blocks',
		'parent' => array(
			'snd/about'
		),
		'example' => array(
			'viewportWidth' => 1200
		),
		'attributes' => array(
			'align' => array(
				'type' => 'string',
				'default' => 'full'
			),
			'anchor' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'supports' => array(
			'html' => false,
			'align' => true,
			'anchor' => true
		),
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => array(
			'swiper',
			'file:./style-index.css'
		),
		'viewScript' => array(
			'swiper',
			'file:./view.js'
		),
		'render' => 'file:./render.php'
	),
	'main' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/main',
		'version' => '0.1.0',
		'title' => 'Посадочный блок',
		'category' => 'snd-blocks',
		'icon' => 'cover-image',
		'example' => array(
			'viewportWidth' => 1200
		),
		'attributes' => array(
			'align' => array(
				'type' => 'string',
				'default' => 'full'
			),
			'title' => array(
				'type' => 'string',
				'default' => 'Смирнова Виктория Александровна'
			),
			'subtitle' => array(
				'type' => 'string',
				'default' => 'Психологические консультации для&nbsp;деловых людей от&nbsp;психоаналитика...'
			),
			'imageBg' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'url' => '',
					'alt' => '',
					'size' => 'large',
					'sizes' => array(
						
					)
				)
			),
			'imageMobile' => array(
				'type' => 'object',
				'default' => array(
					'id' => 0,
					'url' => '',
					'alt' => '',
					'size' => 'large',
					'sizes' => array(
						
					)
				)
			),
			'button' => array(
				'type' => 'object',
				'default' => array(
					'name' => 'Записаться на консультацию →',
					'href' => '/',
					'target' => false
				)
			),
			'currentSocListId' => array(
				'type' => 'string',
				'default' => 'new'
			),
			'currentSocList' => array(
				'type' => 'array',
				'default' => array(
					
				)
			)
		),
		'supports' => array(
			'html' => false,
			'anchor' => true,
			'align' => true
		),
		'textdomain' => 'sndpshsite-blocks',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => array(
			'file:./style-index.css'
		),
		'render' => 'file:./render.php'
	),
	'psychologist-vas-blocks' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'create-block/psychologist-vas-blocks',
		'version' => '0.1.0',
		'title' => 'Psychologist Vas Blocks',
		'category' => 'widgets',
		'icon' => 'smiley',
		'description' => 'Example block scaffolded with Create Block tool.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false
		),
		'textdomain' => 'psychologist-vas-blocks',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	)
);
