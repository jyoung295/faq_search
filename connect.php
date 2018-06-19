<?php

class FAQ
{
    public $question;
    public $answer;
    public $hidden;

    public function __construct($question, $answer, $hidden)
    {
        $this->question = $question;
        $this->answer = $answer;
        $this->hidden = $hidden;
    }
}

function dbConn()
{
    $db = new PDO('mysql:host=localhost;dbname=FAQ', 'root', 'root');

    return $db;
}

function getFaqs($db)
{
    $faqArray = array();

    $question = '';
    $answer = '';
    $hidden = '';

    $sql = 'SELECT * FROM faqs ORDER BY qid';

    foreach ($db->query($sql) as $row) {
        if (!empty($row)) {
            if (!empty($row['1'])) {
                $question = $row['1'];
            }
            if (!empty($row['2'])) {
                $answer = $row['2'];
            }
            if (!empty($row['3'])) {
                $hidden = $row['3'];
            }
        }

        if (!empty($question) && !empty($answer)) {
            $faq = new FAQ($question, $answer, $hidden);
            array_push($faqArray, $faq);
        }

        $question = '';
        $answer = '';
        $hidden = '';
    }

    $db = null;
    $sql = null;
    return $faqArray;
}

function printFaqs()
{
    $db = dbConn();
    $faqArray = getFaqs($db);

    $faqCount = 0;

    foreach ($faqArray as $faq) {
        $faqCount++;
        echo ('
            <li id="faq-'.$faqCount.'">
                <h2>
                    <a href=#faq-'.$faqCount.'">'.$faq->question.'</a>
        ');

        if (!empty($faq->hidden)) {
            echo('
                    <hidden class="hidden-keywords" aria-hidden="true">'.$faq->hidden.'</hidden>
            ');
        }

        echo ('
                </h2>
                <div>
                    <p>'.$faq->answer.'</p>
                </div>
            </li>
        ');
    }
}

?>