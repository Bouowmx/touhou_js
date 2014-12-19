var bullets = [];
var canvas = $("#touhou")[0];
var context_2d = canvas.getContext("2d");
var draw_player = 1;
var player = {images: [], x: 300, y: 400};
for (i = 0; i <= 3; i++) {
	player.images[i] = new Image();
	player.images[i].src = "player/reimu_" + i + ".png";
}
var player_image = 0;
var shoot = 1;
var time_g = $.now();

function Bullet(image, x, y, velocity_x, velocity_y, acceleration_x, acceleration_y, behavior) {
	this.image = new Image();
	this.image.src = image;
	this.x = x;
	this.y = y;
	this.velocity_x = velocity_x;
	this.velocity_y = velocity_y;
	this.acceleration_x = acceleration_x;
	this.acceleration_y = acceleration_y;
	this.behavior = behavior;
}

var frame = function() {
	context_2d.clearRect(0, 0, canvas.width, canvas.height);
	shoot--;
	for (i = 0; i < bullets.length; i++) {
		var bullet = bullets[i];
		if ((bullet.x >= 0) && (bullet.x <= 640) && (bullet.y >= 0) && (bullet.y <= 480)) {
			bullet.x += bullet.velocity_x;
			bullet.y += bullet.velocity_y;
			bullet.velocity_x += bullet.acceleration_x;
			bullet.velocity_y += bullet.acceleration_y;
			context_2d.drawImage(bullet.image, bullet.x, bullet.y);
		} else {
			bullets.splice(i, 1);
			i--;
		}
	}
	context_2d.drawImage(player.images[player_image++], player.x, player.y);
	if (player_image > 3) {player_image = 0;}
	/*var time = $.now();
	console.log(time - time_g);
	time_g = time;*/
};

$("#bgm")[0].src = "bgm/th06_02.ogg";
$("#bgm_text").html("BGM: ほおずきみたいに紅い魂 (A Soul as Red as a Ground Cherry)");
$(document).on("keydown", function(e) {
	//Concurrent key-press issues.
	if (!(e.shiftKey)) {
		if (e.which == 37) {if (player.x > 0) {player.x -= 4;}} //Left
		if (e.which == 38) {if (player.y > 0) {player.y -= 4;}} //Up
		if (e.which == 39) {if (player.x < 640) {player.x += 4;}} //Right
		if (e.which == 40) {if (player.y < 480) {player.y += 4;}} //Down
	} else {
		if (e.which == 37) {if (player.x > 0) {player.x -= 2;}} //Left
		if (e.which == 38) {if (player.y > 0) {player.y -= 2;}} //Up
		if (e.which == 39) {if (player.x < 640) {player.x += 2;}} //Right
		if (e.which == 40) {if (player.y < 480) {player.y += 2;}} //Down
	}
	if (e.which == 90) {
		if (shoot <= 1) {
			bullets[bullets.length] = new Bullet("player/reimu_shot.png", player.x, player.y, 0, -5, 0, 0);
			shoot = 4;
		}
	}
});

var frame_interval = setInterval(frame, 1000 / 60);
var stop_frame_interval = function() {clearInterval(frame_interval);};