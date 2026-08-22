import {
	useState,
	useEffect
} from '@wordpress/element';

import apiFetch from '@wordpress/api-fetch';

import {
	SelectControl,
	TextControl,
	Button,
	ProgressBar
} from '@wordpress/components';

import {
	DragDropContext,
	Droppable,
	Draggable
} from '@hello-pangea/dnd';

import SNDMediaUpload from '../SNDMediaUpload';
import './style.scss';

export default function SNDSocList({ currentSocListId, onChangeSocListId, onChangeSocList }) {
	const [lists, setLists] = useState([]); // Все списки соцсетей
	const [socs, setSocs] = useState([]); // Соцсети выбранного списка
	const [isSaving, setIsSaving] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	// Загружаем все списки соцсетей
	useEffect(() => {
		apiFetch({ path: '/snd/v1/socials' }).then((data) => {
			if (Array.isArray(data) && data.length > 0) {
				setLists(data);

				if (!currentSocListId) {
					onChangeSocListId(data[0].id); // выбираем первый, если атрибут пустой
				}
			} else {
				setLists([]);

				if (!currentSocListId) {
					onChangeSocListId('new'); // новый список
				}
			}
		}).finally(() => {
			setIsLoading(false);
		});
	}, []);

	// Загружаем выбранный список соцсетей
	useEffect(() => {
		if (!currentSocListId || currentSocListId === 'new') {
			setSocs([]);
			return;
		}

		setIsLoading(true);
		apiFetch({ path: `/snd/v1/socials/${currentSocListId}` }).then((data) => {
			setSocs(Array.isArray(data) ? data : []);
		}).finally(() => {
			setIsLoading(false);
		});
	}, [currentSocListId]);

	// Сохраняем выбранный список соцсетей
	const saveSocs = (newSocs) => {
		setIsSaving(true);
		setSocs(newSocs);

		apiFetch({
			path: `/snd/v1/socials/${currentSocListId}`,
			method: 'POST',
			data: newSocs,
		})
			.finally(() => {
				setIsSaving(false);

				if (onChangeSocListId) {
					onChangeSocListId(currentSocListId);
				}

				if (onChangeSocList) {
					onChangeSocList(newSocs);
				}
			});
	};

	// Сохранение нового списка соцсетей
	const onSaveNewList = () => {
		setIsSaving(true);
		apiFetch({
			path: '/snd/v1/socials',
			method: 'POST',
			data: { name: `Social #${Date.now()}`, items: socs },
		}).then((newList) => {
			setLists([...lists, newList]);

			if (onChangeSocListId) {
				onChangeSocListId(newList.id);
			}

			if (onChangeSocList) {
				onChangeSocList([]);
			}
		}).finally(() => setIsSaving(false));
	};

	const onDeleteList = (listId) => {
		if (!confirm('Вы действительно хотите удалить список соцсетей?')) return;

		setIsSaving(true);

		apiFetch({ path: `/snd/v1/socials/${listId}`, method: 'DELETE' })
			.then(() => {
				const updatedLists = lists.filter(l => l.id !== listId);
				setLists(updatedLists);

				if (currentSocListId === listId) {
					const nextId = updatedLists.length ? updatedLists[0].id : 'new';

					if (onChangeSocListId) {
						onChangeSocListId(nextId);
					}

					if (onChangeSocList) {
						onChangeSocList(lists.find((l) => l.id === nextId)?.items || []);
					}
				}
			})
			.finally(() => setIsSaving(false));
	};

	const onChangeSocsItem = (index, value, field) => {
		const updatedSocs = [...socs];
		updatedSocs[index][field] = value;
		saveSocs(updatedSocs);
	};

	const onClickAddSocsItem = () => {
		const newItem = {
			id: Date.now(), // Добавляем уникальный ID
			name: '',
			link: '',
			icon: {
				id: 0,
				url: '',
			},
		};
		const updatedSocs = [...socs, newItem];
		saveSocs(updatedSocs);
	};

	const onSocsDragEnd = (result) => {
		if (!result.destination) return;

		const newSocs = Array.from(socs);
		const [movedItem] = newSocs.splice(result.source.index, 1);
		newSocs.splice(result.destination.index, 0, movedItem);

		saveSocs(newSocs);
	};

	return (
		<div className={`snd-soclist-panel ${isSaving ? 'snd-soclist-panel--saving' : ''}`}>
			{isLoading && <ProgressBar className="snd-soclist-panel__progress-bar" />}

			{!isLoading && (
				<>
					<SelectControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						className="snd-soclist-panel__select-list"
						label="Выберите список соцсетей"
						value={currentSocListId}
						options={[
							...lists.map((l) => ({
								label: l.name || `Social  #${l.id}`,
								value: l.id,
							})),
							{ label: 'Создать новый список...', value: 'new' },
						]}
						onChange={(currentSocListId) => {
							if (onChangeSocListId) {
								onChangeSocListId(currentSocListId);
							}

							if (currentSocListId === 'new') {
								if (onChangeSocList) {
									onChangeSocList([]);
								}
							} else {
								setIsLoading(true);
								apiFetch({ path: `/snd/v1/socials/${currentSocListId}` }).then((data) => {
									if (onChangeSocList) {
										onChangeSocList(Array.isArray(data) ? data : []);
									}
								}).finally(() => {
									setIsLoading(false);
								});
							}
						}}
					/>

					{currentSocListId === 'new' ? (
						<Button
							className="snd-soclist-panel__button-create-new-list"
							variant="primary"
							size="small"
							onClick={onSaveNewList}
						>
							Создать новый список
						</Button>
					) : (
						<>
							<Button
								className="snd-soclist-panel__button-delete-list"
								variant="secondary"
								size="small"
								isDestructive={true}
								onClick={() => onDeleteList(currentSocListId)}
							>
								Удалить список
							</Button>

							<DragDropContext onDragEnd={onSocsDragEnd}>
								<Droppable droppableId="soclist-droppable">
									{(provided) => (
										<div
											{...provided.droppableProps}
											ref={provided.innerRef}
											className="snd-soclist-repeater"
										>
											<label className="snd-soclist-repeater__label">
												Список соцсетей
											</label>

											{socs?.map((item, index) => (
												<Draggable
													key={item.id || index}
													draggableId={`soc-${item.id || index}`}
													index={index}
												>
													{(provided) => (
														<details
															className="snd-soclist-repeater__item"
															ref={provided.innerRef}
															{...provided.draggableProps}
															{...provided.dragHandleProps}
														>
															<summary>
																<div className="snd-soclist-repeater__dragabble-element"></div>
																<div className="snd-soclist-repeater__item-name">
																	{item?.icon?.url ? <img src={item?.icon?.url} alt="" /> : null}
																	<span>{item?.name ? item?.name : `Link ${index + 1}`}</span>
																</div>

																<Button
																	className="is-secondary is-destructive is-small"
																	title="Удалить элемент"
																	onClick={() => {
																		const updatedSocs = [...socs];
																		updatedSocs.splice(index, 1);
																		saveSocs(updatedSocs)
																	}}
																></Button>
															</summary>

															<div className="snd-soclist-repeater__item-content">
																<SNDMediaUpload
																	onSelect={(media) => {
																		const id = media?.id || 0;
																		const mediaUrl = media?.sizes?.thumbnail?.url || media?.url || '';
																		const type = media?.type || 'other';
																		let newMedia = {};

																		if (type === 'image') {
																			newMedia = {
																				...socs[index].icon,
																				id,
																				url: mediaUrl,
																				alt: media?.alt || '',
																				size: media?.size || 'thumbnail',
																				sizes: media?.sizes || {},
																				type: 'image'
																			};
																		} else {
																			newMedia = {
																				...socs[index].icon,
																				id,
																				url: mediaUrl,
																				filename: media?.filename || '',
																				type: type
																			};
																		}

																		onChangeSocsItem(index, newMedia, 'icon');
																	}}
																	allowedTypes={['image']}
																	value={socs[index].icon.id}
																	media={socs[index].icon}
																	onChangeMedia={(image) => {
																		onChangeSocsItem(index, image, 'icon');
																	}}
																	label="Выбрать иконку"
																	labelButton={
																		socs[index]?.icon?.id ? 'Изменить иконку' : 'Выбрать иконку'
																	}
																/>

																<TextControl
																	label="Имя"
																	value={item.name}
																	onChange={(value) =>
																		onChangeSocsItem(index, value, 'name')
																	}
																	__nextHasNoMarginBottom={true}
																	__next40pxDefaultSize
																/>

																<TextControl
																	label="Ссылка"
																	type="url"
																	value={item.link}
																	onChange={(value) =>
																		onChangeSocsItem(index, value, 'link')
																	}
																	__nextHasNoMarginBottom={true}
																	__next40pxDefaultSize
																/>
															</div>
														</details>
													)}
												</Draggable>
											))}

											{provided.placeholder}

											<Button
												className="snd-soclist-repeater__button-add-item"
												variant="primary"
												size="small"
												onClick={onClickAddSocsItem}
											>
												Добавить ссылку
											</Button>
										</div>
									)}
								</Droppable>
							</DragDropContext>
						</>
					)}
				</>
			)}
		</div>
	);
}