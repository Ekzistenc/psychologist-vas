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
		'render' => 'file:./render.php'
	),
	'about-text' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/about-text',
		'version' => '0.1.0',
		'title' => 'Обо мне — текст',
		'category' => 'snd-blocks',
		'icon' => 'editor-alignleft',
		'parent' => array(
			'snd/about'
		),
		'supports' => array(
			'html' => false,
			'inserter' => true,
			'reusable' => false
		),
		'textdomain' => 'sndpshsite-blocks',
		'editorScript' => 'file:./index.js',
		'render' => 'file:./render.php'
	),
	'article' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/article',
		'version' => '0.1.0',
		'title' => 'Статья',
		'category' => 'snd-blocks',
		'icon' => 'text-page',
		'attributes' => array(
			'align' => array(
				'type' => 'string',
				'default' => 'full'
			),
			'gallery' => array(
				'type' => 'array',
				'default' => array(
					
				)
			)
		),
		'supports' => array(
			'html' => false,
			'align' => true,
			'anchor' => true
		),
		'textdomain' => 'sndpshsite-blocks',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => array(
			'glightbox',
			'file:./style-index.css'
		),
		'viewScript' => array(
			'glightbox',
			'file:./view.js'
		),
		'render' => 'file:./render.php'
	),
	'article-content' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/article-content',
		'version' => '0.1.0',
		'title' => 'Содержимое статьи',
		'category' => 'snd-blocks',
		'icon' => 'text',
		'parent' => array(
			'snd/article'
		),
		'supports' => array(
			'html' => false,
			'inserter' => true,
			'reusable' => false
		),
		'textdomain' => 'sndpshsite-blocks',
		'editorScript' => 'file:./index.js',
		'style' => array(
			'file:./style-index.css'
		)
	),
	'articles' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/articles',
		'version' => '0.1.0',
		'title' => 'Список статей',
		'category' => 'snd-blocks',
		'icon' => 'admin-post',
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
			'title' => array(
				'type' => 'string',
				'default' => 'Случаи из практики'
			),
			'categoryId' => array(
				'type' => 'number',
				'default' => 0
			),
			'postsCount' => array(
				'type' => 'number',
				'default' => 10
			),
			'variant' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'supports' => array(
			'html' => false,
			'align' => true,
			'anchor' => true
		),
		'textdomain' => 'sndpshsite-blocks',
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
	'breadcrumbs' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/breadcrumbs',
		'version' => '0.1.0',
		'title' => 'Хлебные крошки',
		'category' => 'snd-blocks',
		'icon' => 'ellipsis',
		'attributes' => array(
			'align' => array(
				'type' => 'string',
				'default' => 'full'
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
	'faq' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/faq',
		'version' => '0.1.0',
		'title' => 'FAQ',
		'category' => 'snd-blocks',
		'icon' => 'editor-help',
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
				'default' => 'faq'
			),
			'title' => array(
				'type' => 'string',
				'default' => 'Часто задаваемые вопросы'
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
		'textdomain' => 'sndpshsite-blocks',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => array(
			'file:./style-index.css'
		),
		'viewScript' => array(
			'file:./view.js'
		),
		'render' => 'file:./render.php'
	),
	'faq-item' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/faq-item',
		'version' => '0.1.0',
		'title' => 'FAQ вопрос',
		'category' => 'snd-blocks',
		'icon' => 'editor-help',
		'parent' => array(
			'snd/faq'
		),
		'attributes' => array(
			'question' => array(
				'type' => 'string',
				'default' => 'Вопрос'
			),
			'answer' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'supports' => array(
			'html' => false,
			'inserter' => true,
			'reusable' => false
		),
		'textdomain' => 'sndpshsite-blocks',
		'editorScript' => 'file:./index.js',
		'render' => 'file:./render.php'
	),
	'footer' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/footer',
		'version' => '0.1.0',
		'title' => 'Подвал',
		'category' => 'snd-blocks',
		'icon' => 'table-row-after',
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
				'default' => 'contacts'
			),
			'title' => array(
				'type' => 'string',
				'default' => 'Контакты'
			),
			'formTitle' => array(
				'type' => 'string',
				'default' => 'Для записи на консультацию, заполните форму обратной связи'
			),
			'phone' => array(
				'type' => 'object',
				'default' => array(
					'numberPhone' => '+7 926 026 0587',
					'numberPhoneHref' => '+79260260587'
				)
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
			'currentSocListId' => array(
				'type' => 'string',
				'default' => 'new'
			),
			'currentSocList' => array(
				'type' => 'array',
				'default' => array(
					
				)
			),
			'menuFooterLinksLeft' => array(
				'type' => 'number',
				'default' => 0
			),
			'menuFooterLinksRight' => array(
				'type' => 'number',
				'default' => 0
			)
		),
		'supports' => array(
			'html' => false,
			'align' => true,
			'anchor' => true
		),
		'textdomain' => 'sndpshsite-blocks',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => array(
			'file:./style-index.css'
		),
		'render' => 'file:./render.php'
	),
	'header' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/header',
		'version' => '0.1.0',
		'title' => 'Шапка',
		'category' => 'snd-blocks',
		'icon' => 'table-row-before',
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
			'colorHeader' => array(
				'type' => 'string',
				'default' => ''
			),
			'menuHeader' => array(
				'type' => 'number',
				'default' => 0
			),
			'menuMobile' => array(
				'type' => 'number',
				'default' => 0
			),
			'button' => array(
				'type' => 'object',
				'default' => array(
					'name' => 'Записаться на консультацию →',
					'href' => '#contacts'
				)
			)
		),
		'providesContext' => array(
			'snd/headerMenuHeader' => 'menuHeader',
			'snd/headerButton' => 'button'
		),
		'supports' => array(
			'html' => false,
			'align' => true,
			'anchor' => true
		),
		'textdomain' => 'sndpshsite-blocks',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => array(
			'file:./style-index.css'
		),
		'viewScript' => array(
			'file:./view.js'
		),
		'render' => 'file:./render.php'
	),
	'header-buttons' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/header-buttons',
		'version' => '0.1.0',
		'title' => 'Кнопки шапки',
		'category' => 'snd-blocks',
		'icon' => 'button',
		'parent' => array(
			'snd/header'
		),
		'usesContext' => array(
			'snd/headerButton'
		),
		'attributes' => array(
			'button' => array(
				'type' => 'object',
				'default' => array(
					'name' => 'Записаться на консультацию →',
					'href' => '#contacts'
				)
			)
		),
		'supports' => array(
			'html' => false,
			'inserter' => false,
			'reusable' => false
		),
		'textdomain' => 'sndpshsite-blocks',
		'editorScript' => 'file:./index.js',
		'render' => 'file:./render.php'
	),
	'header-links' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'snd/header-links',
		'version' => '0.1.0',
		'title' => 'Меню шапки',
		'category' => 'snd-blocks',
		'icon' => 'menu',
		'parent' => array(
			'snd/header'
		),
		'usesContext' => array(
			'snd/headerMenuHeader'
		),
		'attributes' => array(
			'menuHeader' => array(
				'type' => 'number',
				'default' => 0
			)
		),
		'supports' => array(
			'html' => false,
			'inserter' => false,
			'reusable' => false
		),
		'textdomain' => 'sndpshsite-blocks',
		'editorScript' => 'file:./index.js',
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
	)
);
