import {searchVideos, getFavs, handleSearchFactory } from '../src/index';


describe('searchVideos function', () => {
  let mockElement: HTMLUListElement;

  beforeEach(() => {
    mockElement = document.createElement('ul');
    document.body.appendChild(mockElement); 
  });

  afterEach(() => {
    document.body.removeChild(mockElement); 
  });

  test('if no input text, return', async () => {
    const mockInput = document.createElement('input');
    mockInput.id = 'search-input';
    mockInput.value = '';
    document.body.appendChild(mockInput); 

    const result = await searchVideos(mockElement);
    expect(result).toBeUndefined();

    document.body.removeChild(mockInput);
  })

  test('if has input text, returns a promise', async () => {
    const mockInput = document.createElement('input');
    mockInput.id = 'search-input';
    mockInput.value = 'test';
    document.body.appendChild(mockInput); 

    const result = searchVideos(mockElement);
    expect(result).toBeInstanceOf(Promise);

    document.body.removeChild(mockInput); 
  });
});



  describe('getFavs function', () => {
    let mockElement: HTMLUListElement;
  
    beforeEach(() => {
      mockElement = document.createElement('ul');
    });
  
    test('return a promise', async () => {
      const result = getFavs(mockElement);
      expect(result).toBeInstanceOf(Promise);
    });

  });


describe('the function that handles the click or keydown event', () => {
  let mockElement: HTMLUListElement;

  beforeEach(() => {
    mockElement = document.createElement('ul');
    document.body.appendChild(mockElement); 
  });

  afterEach(() => {
    document.body.removeChild(mockElement); 
  });

  test('if event is click or keydown, return a function', async () => {
    const mockButton = document.createElement('button');
    mockButton.id = 'search-button';
    document.body.appendChild(mockButton); 

    const mockInput = document.createElement('input');
    mockInput.id = 'search-input';
    document.body.appendChild(mockInput); 

    const result = handleSearchFactory(mockElement);
    expect(result).toBeInstanceOf(Function)

    document.body.removeChild(mockButton);
    document.body.removeChild(mockInput);
  });
})



  