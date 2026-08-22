<?php
add_action('rest_api_init', function () {
  // Получить все списки соцсетей
  register_rest_route('snd/v1', '/socials', [
    'methods'  => 'GET',
    'callback' => function () {
      $lists = get_option('snd_socials', []);
      if (!is_array($lists)) {
        $lists = [];
      }

      // вернуть как массив с нумерацией
      return rest_ensure_response(array_values($lists));
    },
    'permission_callback' => '__return_true',
  ]);

  // Создать новый список соцсетей
  register_rest_route('snd/v1', '/socials', [
    'methods'  => 'POST',
    'callback' => function ($request) {
      if (!current_user_can('edit_posts')) {
        return new WP_Error('rest_forbidden', __('Недостаточно прав'), ['status' => 403]);
      }

      $params = $request->get_json_params();
      $lists = get_option('snd_socials', []);
      if (!is_array($lists)) {
        $lists = [];
      }

      // Генерируем уникальный ID используя timestamp + случайное число
      $new_id = time() . '_' . wp_rand(1000, 9999);
      $name = !empty($params['name']) ? sanitize_text_field($params['name']) : "Соцсети #$new_id";
      $items = !empty($params['items']) && is_array($params['items']) ? $params['items'] : [];

      $lists[$new_id] = [
        'id' => $new_id,
        'name' => $name,
        'items' => $items,
      ];

      update_option('snd_socials', $lists, false);

      return rest_ensure_response($lists[$new_id]);
    },
    'permission_callback' => function () {
      return current_user_can('edit_posts');
    },
  ]);

  // Получить конкретный список
  register_rest_route('snd/v1', '/socials/(?P<id>[^/]+)', [
    'methods'  => 'GET',
    'callback' => function ($request) {
      if ($request['id'] === 'new') {
        return rest_ensure_response([]);
      }

      $lists = get_option('snd_socials', []);
      if (!is_array($lists)) {
        $lists = [];
      }

      $id = $request['id'];
      if (empty($lists[$id])) {
        return rest_ensure_response([]);
      }

      return rest_ensure_response($lists[$id]['items']);
    },
    'permission_callback' => '__return_true',
  ]);

  // Сохранить конкретный список
  register_rest_route('snd/v1', '/socials/(?P<id>[^/]+)', [
    'methods'  => 'POST',
    'callback' => function ($request) {
      if (!current_user_can('edit_posts')) {
        return new WP_Error('rest_forbidden', __('Недостаточно прав'), ['status' => 403]);
      }

      $id = $request['id'];
      $params = $request->get_json_params();
      $lists = get_option('snd_socials', []);
      if (!is_array($lists)) {
        $lists = [];
      }

      if (!isset($lists[$id])) {
        return new WP_Error('rest_not_found', __('Список не найден'), ['status' => 404]);
      }

      $items = !empty($params) && is_array($params) ? $params : [];
      $lists[$id]['items'] = $items;

      update_option('snd_socials', $lists, false);

      return rest_ensure_response($lists[$id]);
    },
    'permission_callback' => function () {
      return current_user_can('edit_posts');
    },
  ]);

  // Удаление списка соцсетей
  register_rest_route('snd/v1', '/socials/(?P<id>[^/]+)', [
    'methods' => 'DELETE',
    'callback' => function ($request) {
      if (!current_user_can('edit_posts')) {
        return new WP_Error('rest_forbidden', __('Недостаточно прав'), ['status' => 403]);
      }

      $id = $request->get_param('id');
      $all_lists = get_option('snd_socials', []);

      unset($all_lists[$id]);

      update_option('snd_socials', $all_lists);

      return rest_ensure_response(['success' => true]);
    },
    'permission_callback' => fn() => current_user_can('edit_posts'),
  ]);
});
