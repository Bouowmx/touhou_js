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
	/*var player = $("#player")[0];
	player.src = "player/reimu_" + player_image++ + ".png";
	if (player_image > 3) {player_image = 0;}
	player.style.left = "100px";
	player.style.top = "100px";*/
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
var frame_interval = setInterval(frame, 1000 / 60);
var stop_frame_interval = function() {clearInterval(frame_interval);};

$("#bgm")[0].src = "bgm/th06_15.ogg";
$("#bgm_text").html("BGM: U.N.オーエンは彼女なのか？ (U.N. Owen Was Her?)");
$(document).on("keydown", function(e) {
	if (e.which == 90) {
		if (shoot <= 1) {
			bullets[bullets.length] = new Bullet("player/reimu_shot.png", 300, 400, 0, -5, 0, 0);
			shoot = 4;
		}
	}
});