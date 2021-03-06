const expect = require('expect');

module.exports = function(plugin, change) {
    const cursorBlock = change.state.document.getDescendant('_cursor_');
    const initial = change.state.change({ save: false });

    initial
        .moveToRangeOf(cursorBlock)
        .move(6); // Cursor here: Before|After

    const toTest = initial.state.change();

    plugin.changes.insertTable(toTest);

    toTest.undo();

    // Back to previous cursor position
    expect(toTest.state.startBlock.text).toEqual('BeforeAfter');

    return toTest;
};
