<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Получение данных из формы
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Валидация email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Неверный формат email";
        exit;
    }

    // Детали письма
    $to = "ddusembeev04@gmail.com"; // Ваш email адрес
    $subject = "Новое сообщение с контактной формы";
    $headers = "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    // Тело письма
    $body = "
        <h2>Новое сообщение с контактной формы</h2>
        <p><strong>Имя:</strong> $name</p>
        <p><strong>Email:</strong> $email</p>
        <p><strong>Сообщение:</strong></p>
        <p>$message</p>
    ";

    // Отправка письма
    if (mail($to, $subject, $body, $headers)) {
        echo "Сообщение успешно отправлено!";
    } else {
        echo "Не удалось отправить сообщение. Попробуйте позже.";
    }
} else {
    echo "Неверный метод запроса.";
}
?>
