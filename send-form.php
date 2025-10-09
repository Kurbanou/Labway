<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

// Подключаем PHPMailer
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';
require 'phpmailer/src/Exception.php';

// Проверяем, что форма отправлена методом POST
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Получаем и очищаем данные
    $name    = trim($_POST['name'] ?? '');
    $email   = trim($_POST['email'] ?? '');
    $message = trim($_POST['message'] ?? '');
    $consent = isset($_POST['consent']);

    // Простая валидация
    if (!$name || !$email || !$message || !$consent || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die('Пожалуйста, заполните все поля корректно и подтвердите согласие.');
    }

    // Настраиваем PHPMailer
    $mail = new PHPMailer(true);
    try {
        // SMTP настройки
        $mail->CharSet = 'UTF-8';
        $mail->Subject = 'Новое сообщение с сайта';
        $mail->isSMTP();
        $mail->Host       = 'smtp.mail.ru';         // Заменить на ваш SMTP-сервер
        $mail->SMTPAuth   = true;
        $mail->Username   = 'wsite@labway.pro';         // Ваш email
        $mail->Password   = '******************';      // Пароль приложения
        $mail->SMTPSecure = 'ssl';                    // 'tls' или 'ssl'
        $mail->Port       = 465;                      // 465 для SSL, 587 для TLS

        // От кого и кому
        $mail->setFrom('wsite@labway.pro', 'Сайт');       // Отправитель
        $mail->addAddress('Orders@labway.pro');           // заказчик
        // $mail->addAddress('kurbanou.faridun@gmail.com');  // копия для контроля

        // HTML-содержание письма
        $mail->isHTML(true);
        $mail->Subject = 'Новое сообщение с сайта';
        $mail->Body    = "
            <h2>Новое сообщение</h2>
            <p><strong>Имя:</strong> {$name}</p>
            <p><strong>Email:</strong> {$email}</p>
            <p><strong>Сообщение:</strong><br>{$message}</p>
        ";

        // Отправка
        $mail->send();
        echo 'Спасибо! Ваше сообщение успешно отправлено.';
    } catch (Exception $e) {
        echo "Ошибка при отправке: {$mail->ErrorInfo}";
    }
}
