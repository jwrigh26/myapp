# Is Perefect Square

function isPerfectSquare(num) {
    if (num < 0) return -1;

    let start = 0;
    let end = num;

    while ( start <= end) {
        const mid = Math.floor((start + end) / 2);
        const square = mid * mid;

        if (sqaure === num) {
            return square;
        } else if ( square < num ) {
            start = mid + 1;
        } else {
            end = mid - 1;
        }
    }
}