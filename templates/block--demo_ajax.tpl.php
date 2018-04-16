
<div id="<?php print $block_html_id; ?>" class="<?php print $classes; ?>"<?php print $attributes; ?>>

  <div>
    <button class="loadUser" data-id="1">Load User 1</button>
    <button class="loadUser" data-id="2">Load User 2</button>
    <button class="saveUser" data-id="1">Save User 3 and get response (echo)</button>
  </div>

  <div>User data:</div>

  <pre class="userData">data placeholder</pre>

  <div class="content"<?php print $content_attributes; ?>>
    <?php print $content ?>
  </div>

</div>
