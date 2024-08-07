(() => {
    let palette = ["-", "-", "-", "-", "-"];
  
    document.addEventListener("DOMContentLoaded", () => {
      generate();
      const generateButton = document.getElementById("generate");
      if (generateButton) {
        generateButton.addEventListener("click", generate);
      }
      document.addEventListener("keydown", (e) => {
        if (e.key === "n" || e.key === "N") {
          generate();
        }
      });
  
      const locks = document.querySelectorAll(".lock");
      locks.forEach((lock, index) => {
        lock.addEventListener("click", (e) => handleLock(e, index));
      });
    });
  
    function handleLock(e, index) {
      let locked = e.currentTarget;
      if (locked.dataset.locked === "false") {
        locked.dataset.locked = "true";
        palette[index] = locked.parentElement.dataset.value;
      } else if (locked.dataset.locked === "true") {
        locked.dataset.locked = "false";
        palette[index] = "-";
      }
      console.log('Palette updated:', palette); // Print palette to console for debugging
    }
  
    function generate() {
      console.log('Generating palette...'); // Indicate generate function is called
      const jsObject = {
        adjacency: [
          1, 75, 33, 45, 31, 75, 1, 58, 51, 77, 33, 58, 1, 0, 0, 45, 51, 0, 1, 0,
          31, 77, 0, 0, 1,
        ],
        mode: "transformer",
        num_colors: 5,
        num_results: 1,
        palette: palette,
      };
  
      fetch("https://api.huemint.com/color", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        body: JSON.stringify(jsObject),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Data received:', data); // Print data to console for debugging
          let newPalette = data.results[0].palette;
          const colorDivs = document.querySelectorAll(".color");
  
          colorDivs.forEach((div, index) => {
            div.style.backgroundColor = newPalette[index];
            div.parentElement.dataset.value = newPalette[index];
          });
        })
        .catch(error => {
          console.error('Error:', error); // Log any errors
        });
    }
  })();
  